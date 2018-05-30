#!/usr/bin/env python3

"""
    Python program to run a simple HTTP web server capable of handling CGI scripts
        that serves files from the ./pywww directory and 
        executable scripts over CGI from the ./pywww/api directory
"""

import os
from http.server import HTTPServer, CGIHTTPRequestHandler

port = 5000
webroot = os.path.dirname(os.path.realpath(__file__)) + '/pywww'

os.chdir(webroot)

handler = CGIHTTPRequestHandler
handler.cgi_directories = ['/api']

httpd = HTTPServer(('', port), handler)
print('Web server running at port ' + str(httpd.server_port))

httpd.serve_forever()