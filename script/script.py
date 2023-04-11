import csv
import json

features = []
with open('sample.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        data = {}
        data['type'] = 'Feature'
        data['geometry'] = {
            'type': 'Point',
            'coordinates': [float(row['Longitude']), float(row['Latitude'])]
        }
        data['properties'] = {
            'event_id': row['Event ID'],
            'time': row['UTC time'],
            'Port': row['Port'],
            'event_type': row['Event type'],
            'from': row['From'],
            'to': row['To'],
            'unit': row['Unit'],
            'duration': row['Duration']
        }
        features.append(data)

result = {}
result['type'] = 'FeatureCollection'
result['features'] = features
with open('sample.geojson', 'w') as f:
    json.dump(result, f, indent=2)
