from mongoengine import *
from db.env import *
from db.dao import *
import kml2geojson
import csv


connection = connect('fiber-monitor', host=DB_URI)
# connection = connect(host=DB_URI)

res = Event.objects()
print(res)


def format_coordinates(coordinates):
    # strip elevation from position coordinates
    return [[long, lat] for long, lat, _ in coordinates]


route_geojson = kml2geojson.main.convert('./example_inputs/route.kml')
# might change if multiple routes given
for route_feature in route_geojson[0]['features']:
    name = route_feature['properties']['name']
    geometry = route_feature['geometry']
    geometry['coordinates'] = format_coordinates(geometry['coordinates'])
    route = Route(name=name, geometry=geometry)
    route.save()

with open('./example_inputs/event.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        event = {}
        event['geometry'] = {
            'type': 'Point',
            'coordinates': [float(row['Longitude']), float(row['Latitude'])]
        }
        event['event_id'] = int(row['Event ID'])
        event['time'] = row['UTC time']
        event['port'] = row['Port']
        event['event_type'] = row['Event type']
        event['start'] = row['From']
        event['end'] = row['To']
        event['unit'] = row['Unit']
        event['duration'] = row['Duration']
        curr_event = Event(**event)
        curr_event.save()
