from models.data import archived

import csv
import io

def view(kind = ''):
    query = {}
    if not kind == '':
        query['{}.{}'.format('sensorData', kind)] = {'$exists': True}
    
    data = archived.get(query)
    keys = data[0].keys()

    out = io.StringIO()
    writer = csv.DictWriter(out, fieldnames = keys)
    writer.writeheader()
    for rowdict in data:
        writer.writerow(rowdict)

    return out.getvalue()
