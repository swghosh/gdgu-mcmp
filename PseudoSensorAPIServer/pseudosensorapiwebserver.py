#!/usr/bin/env python3

import os
from http.server import HTTPServer, CGIHTTPRequestHandler

port = 5000
webroot = os.path.dirname(os.path.realpath(__file__)) + '/pywww'

os.chdir(webroot)

httpd = HTTPServer(('', port), CGIHTTPRequestHandler)
print('Web server running at port ' + str(httpd.server_port))

httpd.serve_forever()