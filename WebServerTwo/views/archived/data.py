from models.data import archived
from models import datadecorate

import json

def view():
    return json.dumps(
        [datadecorate.decorate(data, 0) for data in archived.get()]
    )