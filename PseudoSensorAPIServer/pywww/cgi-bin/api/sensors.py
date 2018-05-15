#!/usr/bin/env python3

import datetime
import json
import random

gdguCoordinates = {
    'lat': 28.2699415,
    'lng': 77.0636767
}

def mockedSensor(sensorChannel):
    mock = {
        'timestamp': str(datetime.datetime.now().isoformat()),
        'latitude': gdguCoordinates['lat'],
        'longitude': gdguCoordinates['lng'],
        'sensorChannel': sensorChannel,
        'sensorData': {
            'parameter1': int(random.random() * 60),
            'parameter2': int(random.random() * 1000)
        }
    }
    return mock

def do(sensorChannel):
    print('Content-Type: application/json', end='\r\n\r\n')
    jsonString = json.dumps(mockedSensor(sensorChannel))
    print(
        json.dumps(
            mockedSensor(sensorChannel)
        ), end = ''
    )