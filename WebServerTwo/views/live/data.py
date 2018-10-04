from models.data import live

import json

def view(kind = ''):
    return json.dumps(live.get())