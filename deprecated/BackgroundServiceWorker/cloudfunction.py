from urllib import request
from pymongo import MongoClient
import json
from datetime import datetime
import os
import sys

apiUrl = os.environ['SENSOR_DATA_API_URL']
mongoUrl = os.environ['DATABASE_URL']
dbName = os.environ['DATABASE_NAME']
collectionName = 'sensorData'

def service():
    try:
        client = MongoClient(mongoUrl)
        db = client[dbName]

        jsonRecvd = request.urlopen(apiUrl).read().decode('utf-8')
        sensorData = json.loads(jsonRecvd)

        db[collectionName].insert_many(sensorData)

        return {
            'success': True,
            'time': str(datetime.now().isoformat())
        }
    except Exception as exception:
        print(str(exception), file = sys.stderr)
        return {
            'success': False,
            'time': str(datetime.now().isoformat())
        }

def requester(request):
    return json.dumps(
        service()
    )