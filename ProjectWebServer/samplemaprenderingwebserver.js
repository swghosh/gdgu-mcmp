#!/usr/bin/env node

/* 
 * A sample application built on node.js that works as a web server
 * to render maps using the GMaps API
 * based upon data parsed from an external server from where the data is received.
 * The external API server is contacted by means of HTTP GET requests.
 * 
 * The external server furnishes the web application with data like:
 * - latitude, longitude co-ordinates of a place;
 * - certain key (paramater), value pairs of data from sensors;
 * - timestamp of the data when sensors recorded the data (realtime).
*/

const externalApiServerURL = 'http://localhost:5000/cgi-bin/api/sensorA'

const http = require('http')
const url = require('url')
const fs = require('fs')

var server = http.createServer((request, response) => {
    var requestUri = url.parse(request.url)

    if(requestUri.pathname == '/') {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        fs.readFile(__dirname + 'htdocs/dynamicmap.html', 'utf8', (err, html) => {
            if(err) {
                response.end('Error')
                return
            }

            response.end(html)
        })

    }
    else if(requestUri.pathname == '/maprender.js') {
        response.writeHead(200, {
            'Content-Type': 'application/javascript'
        })

        // make request to externalApiServer for sensor data
        var sensorDataRequest = http.get(externalApiServerURL, (sensorDataRes) => {
            var jsonString = ''
            sensorDataRes.on('data', (chunk) => {
                jsonString += chunk
            })
            sensorDataRes.on('end', () => {
                var jsCodeString = `var content = \'${jsonString}\';`

                fs.readFile(__dirname + 'htdocs/maprender.js', 'utf8', (err, js) => {
                    response.end(`${jsCodeString}\n${js}`)
                })
            })
        })
    }
    else {
        response.writeHead(404, {
            'Content-Type': 'text/plain'
        })
        response.end('Resource not found. (error)')
    }
})

server.listen(7090)

console.log('web server started at 7090 that will render maps')