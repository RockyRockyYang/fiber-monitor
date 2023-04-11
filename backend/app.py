from flask import Flask
from mongoengine import connect
from .db.dao import *
from .db.env import *
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
connection = connect('fiber-monitor', host=DB_URI)


@app.route('/events', methods=['GET'])
def get_events():
    try:
        events = Event.objects()
        events_list = [event.to_mongo().to_dict() for event in events]
        for event in events_list:
            del event['_id']
        return {
            "res": events_list,
            "success": True
        }
    except Exception as e:
        return {
            "res": f"can not get all the events from db! error: {e}",
            "success": False
        }


@app.route('/routes', methods=['GET'])
def get_routes():
    try:
        routes = Route.objects()
        routes_list = [route.to_mongo().to_dict() for route in routes]
        for route in routes_list:
            del route['_id']
        return {
            "res": routes_list,
            "success": True
        }
    except Exception as e:
        return {
            "res": f"can not get all the routes from db! error: {e}",
            "success": False
        }


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
