from models.data import live
from models import datadecorate

import json

def view():
    return json.dumps(
        [datadecorate.decorate(data, 0) for data in live.get()]
    )