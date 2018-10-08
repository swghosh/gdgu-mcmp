from views import index
from views import error

from views.live import data as livedata
from views.archived import data as archiveddata

import preset

import re

paths = [
    '/',
    r'^/archived/data/(\w+)$',
    r'^/live/data/(\w+)$',
    r'^/archived/graph/(\w+)$',
    r'^/live/map/(\w+)$',
    r'^/archived/csv/(\w+)$'
]

def serve(environ):
    
    path = environ['PATH_INFO']
    status = '200 OK'

    headers = [
        ('Content-Type', 'text/html')
    ]

    # homepage index html
    if path == paths[0]:
        data = index.view()

    # archived data json
    elif not re.match(paths[1], path) is None:
        matches = re.match(paths[1], path)
        kind = matches.group(1)
        headers[0] = ('Content-Type', 'application/json')
        data = onPresetMatch(kind, archiveddata.view, error.view)

    # live data json
    elif not re.match(paths[2], path) is None:
        matches = re.match(paths[2], path)
        kind = matches.group(1)
        headers[0] = ('Content-Type', 'application/json')
        data = onPresetMatch(kind, livedata.view, error.view)

    # archived graph html
    elif not re.match(paths[3], path) is None:
        data = 'Not implemented yet.'

    # live map html
    elif not re.match(paths[4], path) is None:
        data = 'Not implemented yet.'

    # not found html
    else:
        status = '404 Not Found'
        data = error.view()

    return data, headers, status

def onPresetMatch(kind, successAction, failAction, jsonFlag = True):
    # kind matches preset
    if preset.preset.__contains__(kind):
        return successAction(kind)
    # no such preset
    else:
        if jsonFlag:
            return failAction('json', 'no such preset')
        else:
            return failAction('html', 'no such preset')