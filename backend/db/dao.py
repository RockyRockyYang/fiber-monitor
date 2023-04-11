from mongoengine import *


class Event(Document):
    event_id = IntField()
    time = DateTimeField()
    port = StringField()
    event_type = StringField()
    start = StringField()
    end = StringField()
    unit = StringField()
    duration = StringField()
    geometry = PointField()


class Route(Document):
    name = StringField()
    geometry = LineStringField()
