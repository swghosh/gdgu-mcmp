from views import index
from views import live
from views import archived
from views import error

def serve(environ):
    
    path = environ['PATH_INFO']
    status = '200 OK'

    if path.startswith('/live/'):
        data = live.view()
    elif path.startswith('/archived/'):
        data = archived.view()
    elif path == '/':
        data = index.view()
    else:
        data = error.view()
        status = '404 Not Found'

    headers = [
        ('Content-Type', 'text/html')
    ]
    return data, headers, status
