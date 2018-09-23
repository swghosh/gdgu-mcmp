import os
from urllib import request
import json

sensorServerUrl = os.environ['SENSOR_SERVER_URL']

def get(query = {}):
    jsonReceived = request.urlopen(sensorServerUrl).read().decode('utf-8')
    sensorData = json.loads(jsonReceived)

    for key in query:
        [rcChannel, rcName] = key.split('.')
        rcValue = query[key]

        sensorData = list(filter(lambda data: data[rcChannel][rcName] == rcValue, sensorData))

    return sensorData
