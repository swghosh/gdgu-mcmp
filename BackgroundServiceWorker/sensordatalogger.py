#!/usr/bin/env python3

""" 
Python program to do the following (like a background script):
    * make GET requests to a particular backend API server host
    * receive the JSON file and parse it in the form of dictionary
    * connect to a backend mongoDB server
    * insert the aforesaid dictionary containing the sensor data into a database collection
    * repeat the process after a fixed time interval until SIGKILL 
"""

from urllib import request
from pymongo import MongoClient
import json
from datetime import datetime
import time
import os
import sys

authFile = open(os.path.join(os.path.dirname(__file__), 'authfile.json'), 'r')
authFileContents = ''

for line in authFile:
    authFileContents = authFileContents + line

authParams = json.loads(authFileContents)

mongoHost = str(authParams['mongoHost'])
mongoUsername = str(authParams['mongoUsername'])
mongoPassword = str(authParams['mongoPassword'])
mongoDbName = str(authParams['mongoDbName'])

mongoCollectionName = 'sensorData'

apiHost = 'swghosh.pythonanywhere.com'
apiPort = 80
apiURI = '/gdgu-mcmp/api/sensorData'

mongoURL = 'mongodb+srv://' + mongoUsername + ':' + mongoPassword + '@' + mongoHost + '/' + mongoDbName

# http urls that contain port 80 explicitly in it fails when urllib.request.urlopen(URL), appropriate fix
if not apiPort == 80:
    apiURL = 'http://' + apiHost + ':' + str(apiPort) + apiURI
else:
    apiURL = 'http://' + apiHost + apiURI

timeFrequency = 5 * 60

while True:
    try:
        client = MongoClient(mongoURL)

        db = client[mongoDbName]

        jsonRecvd = request.urlopen(apiURL).read().decode('utf-8')

        sensorData = json.loads(jsonRecvd)

        db[mongoCollectionName].insert_many(sensorData)

        client.close()

        print(str(datetime.now()) + ' - - [inserted to db collection] ' + str(sensorData))

    except Exception as exception:
        print(str(datetime.now()) + ' - - [error occured] ' + '\nRetrying in ' + str(timeFrequency) + ' seconds.', exception, file = sys.stderr)

    time.sleep(timeFrequency)
