from models.data import archived

import json

def view(kind = ''):
    query = {}
    if not kind == '':
        query['{}.{}'.format('sensorData', kind)] = {'$exists': True}
    return json.dumps(archived.get(query))