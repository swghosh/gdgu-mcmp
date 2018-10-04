from models.data import archived

import json

def view(kind = ''):
    return json.dumps(archived.get())