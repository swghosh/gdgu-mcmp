#!/usr/bin/env python3

""" 
Python module containing the following functions:
    * mockedSensor function to generate a dictionary of sensor data
        of the format:
        { 
            timestamp: isoDateString, latitude: coordinate, longitude: coordinate, sensorChannel: channelIdString,
            senorData: {
                parameter1: value1, parameter2: value2, ..., parameterN: valueN
            }
        }
    * do function will print a line of 'Content-Type: application/json' for CGI 
        and print a json string of the dictionary containing sensor data generated using mockedSensor
"""

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