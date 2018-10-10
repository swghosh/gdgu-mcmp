import base64
import os
import json

from pymongo import MongoClient

mongoUrl = os.environ['DATABASE_URL']
dbName = os.environ['DATABASE_NAME']
collectionName = 'liveSensorData'

def task(event, context):
    message = base64.b64decode(event['data']).decode('utf-8')
    document = {
        'event': event['attributes'],
        'data': json.loads(message)
    }
    client = MongoClient(mongoUrl)
    db = client[dbName]

    db[collectionName].insert_one(document)