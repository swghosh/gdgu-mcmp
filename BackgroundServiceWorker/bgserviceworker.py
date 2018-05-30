#!/usr/bin/env python

""" 
Python program to do the following (like a background script):
    * make GET requests to a particular backend API server host
    * receive the JSON file and parse it in the form of dictionary
    * connect to a backend mongoDB server
    * insert the aforesaid dictionary containing the sensor data into a database collection
    * repeat the process after a fixed time interval until SIGKILL 
"""

import urllib2
import pymongo
import json
import datetime
import time
import os

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
apiURI = '/gdgu-mcmp/api/sensorA'

mongoURL = 'mongodb+srv://' + mongoUsername + ':' + mongoPassword + '@' + mongoHost + '/' + mongoDbName
apiURL = 'http://' + apiHost + ':' + str(apiPort) + apiURI

timeFrequency = 5 * 60

while True:
    try:
        client = pymongo.MongoClient(mongoURL)

        db = client[mongoDbName]

        jsonRecvd = urllib2.urlopen(apiURL).read()

        sensorData = json.loads(jsonRecvd)

        db[mongoCollectionName].insert(sensorData)

        client.close()

        print(str(datetime.datetime.now()) + ' - - [inserted to db collection] ' + str(sensorData))

    except:
        print(str(datetime.datetime.now()) + ' - - [error occured] ' + '\nRetrying in ' + str(timeFrequency) + ' seconds.')

    time.sleep(timeFrequency)
