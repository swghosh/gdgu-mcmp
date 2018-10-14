import os
from pymongo import MongoClient

databaseUrl = os.environ['DATABASE_URL']
databaseName = os.environ['DATABASE_NAME']
collectionName = 'liveSensorData'

hardLimit = 2

def get(query = {}):
    client = MongoClient(databaseUrl)
    db = client[databaseName]

    return [telemetryData['data'] 
        for telemetryData in db[collectionName].find(query).sort('$natural', -1).limit(hardLimit)
    ]
