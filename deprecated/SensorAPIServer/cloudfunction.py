#!/usr/bin/env python3

# sensors.py

""" 
Python module containing the following functions:
    * mockedSensor function to generate a dictionary of sensor data
        of the format:
        { 
            timestamp: isoDateString, latitude: coordinate, longitude: coordinate, 
            sensorChannel: {
                name: nameString,
                id: idString
            },
            senorData: {
                parameter1: {
                    value: numericValue1,
                    unit: unitString1
                }, parameter2: {
                    value: numericValue2,
                    unit: unitString2
                }, ..., parameterN: {
                    value: numericValueN,
                    unit: unitStringN
                }
            }
        }
    the dictionary can safely be converted into JSON in order to be used for information interchange
"""

from datetime import datetime
from random import random

gdguCoordinates = {
    'lat': 28.2699415,
    'lng': 77.0636767
}

def mockedSensor(parameters):
    mock = {
        'timestamp': str(datetime.now().isoformat()),
        'latitude': gdguCoordinates['lat'],
        'longitude': gdguCoordinates['lng'],
        'sensorData': dict(
            map(lambda parameter: (parameter, {
                'value': int(random() * 1000),
                'unit': 'mg/dL'
            }), parameters)
        )
    }
    return mock

# preset.py
''' 
    Configuration file to define presets
    relating to the type of data that will be exchanged.
    to and fro the sensors
    YOU ARE REQUIRED TO EDIT THIS FILE CAREFULLY ;/
'''

preset = {
    'soilMoist': 'GROUND-QUAL-SENSORS',
    'coTwoConc': 'AIR-QUAL-SENSORS'
}

# main.py
import json

def requester(request):
    sensorData = []
    for key in preset:
        sensorData.append(
        	mockedSensor([key])
        )
    return json.dumps(sensorData, indent = 4)
