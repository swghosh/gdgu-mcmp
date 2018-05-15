#!/usr/bin/env python3

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
import time
import os

mongoHost = os.environ['MONGO_HOST']
mongoUsername = os.environ['MONGO_USERNAME']
mongoPassword = os.environ['MONGO_PASSWORD']
mongoDbName = os.environ['MONGO_DB_NAME']
mongoCollectionName = 'sensorData'

apiHost = 'localhost'
apiPort = 5000
apiURI = '/cgi-bin/api/sensorA'

timeFrequency = 5 * 60

mongoURL = 'mongodb://' + mongoUsername + ':' + mongoPassword + '@' + mongoHost + '/' + mongoDbName
apiURL = 'http://' + apiHost + ':' + str(apiPort) + apiURI
timeFrequency = 5 * 60

while True:
    client = pymongo.MongoClient(mongoURL)
    db = client[mongoDbName]

    jsonRecvd = urllib2.urlopen(apiURL).read()

    sensorData = json.loads(jsonRecvd)

    db[mongoCollectionName]insert(sensorData)

    client.close()

    time.sleep(timeFrequency)
