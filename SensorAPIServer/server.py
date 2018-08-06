#!/usr/bin/env python3
import os
import json

from wsgiref.simple_server import make_server
import sensors

# set web sever port for listening
port = 8080

try:
    port = int(os.environ['PORT'])
except:
    pass

def application(environment, start_response):
    status = '200 OK'
    body = json.dumps([sensors.mockedSensor({
        'name': 'GROUND-QUAL-SENSORS',
        'id': 'g-channel'
    }, ['soilMoist']), sensors.mockedSensor({
        'name': 'AIR-QUAL-SENSORS',
        'id': 'h-channel'
    }, ['coTwoConc'])])
    
    headers = [
        ('Server', 'EnvySensorNet/1.0'),
        ('Content-Type', 'application/json'),
        ('Content-Length', str(len(body)))
    ]
    start_response(status, headers)
    return [body.encode('utf-8')]

httpd = make_server('', 8080, application)
httpd.serve_forever()
