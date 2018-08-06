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

from datetime import datetime
import json
from random import random

gdguCoordinates = {
    'lat': 28.2699415,
    'lng': 77.0636767
}

def mockedSensor(sensorChannel, parameters):
    mock = {
        'timestamp': str(datetime.now().isoformat()),
        'latitude': gdguCoordinates['lat'],
        'longitude': gdguCoordinates['lng'],
        'sensorChannel': sensorChannel,
        'sensorData': dict(
            map(lambda parameter: (parameter, {
                'value': int(random() * 1000),
                'unit': 'mg/dL'
            }), parameters)
        )
    }
    return mock

enumerate