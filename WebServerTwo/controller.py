from views import index
from views import live
from views import archived

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
        data = 'Resource not available.'
        status = '404 Not Found'

    headers = [
        ('Content-Type', 'text/html')
    ]
    return data, headers, status
