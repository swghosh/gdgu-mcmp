from views import index
from views import error

from views.live import data as livedata
from views.archived import data as archiveddata

import re

def serve(environ):
    
    path = environ['PATH_INFO']
    status = '200 OK'

    headers = [
        ('Content-Type', 'text/html')
    ]

    # homepage index html
    if path == '/':
        data = index.view()
    elif re.match('/live/data', path) is not None:
        headers[0] = ('Content-Type', 'application/json')
        data = livedata.view()
    elif re.match('/archived/data', path) is not None:
        headers[0] = ('Content-Type', 'application/json')
        data = archiveddata.view()
    else:
        data = 'Not a valid page.'

    return data, headers, status
