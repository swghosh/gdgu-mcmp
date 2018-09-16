import os
from urllib import request
import json

sensorServerUrl = os.environ['SENSOR_SERVER_URL']

def get(kind = ''):
    jsonReceived = request.urlopen(sensorServerUrl).read().decode('utf-8')
    sensorData = json.loads(jsonReceived)
    return sensorData
