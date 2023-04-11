import kml2geojson
import json

res = kml2geojson.main.convert('./example.kml')
with open('route.geojson', 'w') as f:
    json.dump(res[0], f, indent=2)
