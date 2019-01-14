import os
from pymongo import MongoClient

databaseUrl = os.environ['DATABASE_URL']
databaseName = os.environ['DATABASE_NAME']
collectionName = 'archivedSensorData'

hardLimit = 50

def get(query = {}):
    client = MongoClient(databaseUrl)
    db = client[databaseName]

    sensorData = []
    for data in db[collectionName].find(query).sort('timestamp', -1).limit(hardLimit):
        data.pop('_id')
        sensorData.append(data)

    # reverse the list
    return sensorData[::-1]
