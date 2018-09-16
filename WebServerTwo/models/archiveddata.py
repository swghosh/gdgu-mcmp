import os
from pymongo import MongoClient

databaseUrl = os.environ['DATABASE_URL']
databaseName = os.environ['DATABASE_NAME']
collectionName = 'sensorData'

hardLimit = 50

def get(query = {}):
    client = MongoClient(databaseUrl)
    db = client[databaseName]

    sensorData = []
    for data in db[collectionName].find(query).limit(hardLimit):
        data.pop('_id')
        sensorData.append(data)

    return sensorData
