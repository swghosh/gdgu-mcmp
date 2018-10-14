from models.data import live

import json

def view(kind = ''):
    query = {}
    if not kind == '':
        query['{}.{}.{}'.format('data', 'sensorData', kind)] = {'$exists': True}
    return json.dumps(live.get(query))