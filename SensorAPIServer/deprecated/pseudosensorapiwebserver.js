#!/usr/bin/env node

// This script have been deprecated since
// api web server implementation is now using python

/* 
 * A pseudo application built on node.js that acts as a web server
 * to render JSON objects containing data from mocked sensors
 * 
 * the mocked sensors produce demo objects with the following specifications :
 * { 
 *     timestamp: DateISOString,
 *     latitude: Number,
 *     longitude: Number, 
 *     sensorChannel: String, 
 *     sensorData: {
 *          parameter1: Number, parameter2: Number
 *     }
 * }
 * timestamp of current date and time;
 * latitude and longitude coordinates of GD Goenka University (sample location);
 * sensor channel is either sensorA / sensorB / sensorC;
 * sensorData parameter1 (value range: 0, 50), parameter2 (value range: 0, 2500) provides random values on each call
 * 
 * error state produces object :
 * { api: ErrorString }
 * api error string containing HTTP error message;
 * 
 * all are served as HTTP responses based on HTTP requests.
 */

const http = require('http')
const url = require('url')

// coordinates of GD Goenka University, Gurugram, Haryana 122103, India (IN)
const gdguCoordinates = {
    lat: 28.2699415,
    lng: 77.0636767
}

var mockedSensor = (sensorChannel) => {
    return {
        timestamp: new Date(),
        // co-ordinates of GD Goenka University
        latitude: gdguCoordinates.lat,
        longitude: gdguCoordinates.lng,
        sensorChannel: sensorChannel,
        sensorData: {
            parameter1: Math.round(Math.random() * 50),
            parameter2: Math.round(Math.random() * 2500)
        }
    }
}

var webServer = http.createServer((request, response) => {
    var requestBody = ''

    request.on('data', (chunk) => {
        if(requestBody.length > 1e6) request.connection.destroy()

        requestBody += chunk
    })

    request.on('end', () => {

        var responsifyStatus = (statusCode) => {
            response.writeHead(statusCode, {
                'Content-Type': 'application/json'
            })
            response.end(JSON.stringify({
                api: http.STATUS_CODES[statusCode]
            }))
        }

        var responsifyObject = (object) => {
            response.writeHead(200, {
                'Content-Type': 'application/json'
            })
            response.end(JSON.stringify(object))
        }
        

        var requestUri = url.parse(request.url)
        if(requestUri.pathname === '/api/sensorA') {
            responsifyObject(mockedSensor('sensorA'))
        }
        else if(requestUri.pathname === '/api/sensorB') {
            responsifyObject(mockedSensor('sensorB'))            
        }
        else if(requestUri.pathname === '/api/sensorC') {
            responsifyObject(mockedSensor('sensorC'))
        }
        else {
            responsifyStatus(404)
        }

    })
})

webServer.listen(5000)

console.log('web server running at port 5000 for mocked sensor data')