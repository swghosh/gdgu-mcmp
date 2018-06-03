#!/usr/bin/env node

// Node.js Application

/* 
 * A simple Node.js web server that can do the following:
 *  - serve static files (html, css, js, etc.) from the 'htdocs' directory
 *  - serve dynamic files
 *      - dynamic files requested must include '.dyn.' before its file extension name
 *      - the dynamicness of the file is served using a js file of corresponding name from the 'dynamics' directory
 *      - the called js module must include a serve function which will receive (request, response, requestBody) as its arguments
 */


// required built-in modules
var http = require('http')
var fs = require('fs')
var path = require('path')
var url = require('url')

// constants defining the port, webroot directory, dynamics directory, mime types
const port = process.env.PORT || 5000
const webroot = path.join(__dirname, 'htdocs')
const dynamics = path.join(__dirname, 'dynamics')
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.txt': 'text/plain',
    '.json': 'application/json',
    '.jpg': 'image/jpg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mp3',
    '.mp4': 'video/mp4',
    'other': 'application/octet-stream'
}

// function will print message with date and time to console (log, error) based on boolean argument error
var printWithTime = (message, error) => {
    var timedMessage = `[${new Date().toDateString()} ${new Date().toTimeString()}] : ${message}`

    if(error) {
        console.error(timedMessage)
    }
    else {
        console.log(timedMessage)
    }
}

// create the HTTP server
var webServer = http.createServer((request, response) => {
    // initial request body as blank
    var requestBody = ''

    request.on('data', (chunk) => {
        // in case of too large request body, destroy the connection
        if(requestBody.length > 1e6) request.connection.destroy()

        // append the request body with chunks of data
        else requestBody += chunk
    })

    // when the request body has finished
    request.on('end', () => {
        // generate response
        prepareForResponse(request, response, requestBody)
    })

    // in case of request error
    request.on('error', (err) => {
        printWithTime('request error', true)
    })
})

// prepare for response generates response based on request received
var prepareForResponse = (request, response, requestBody) => {
    // log the URI of the current request
    printWithTime(`${request.url} was requested`)

    // parse the request URI
    var uri = url.parse(path.normalize(request.url))

    // if path is root use /index.html as path
    if(uri.pathname == '/') {
        uri.pathname = '/index.html'
    }

    // for dynamically serviceable pages
    if(uri.pathname.includes('.dyn.')) {
        // obtain a file path from the dynamics directory appending .js for required module
        var filePath = path.join(dynamics, uri.pathname + '.js')
        
        // check if file exists or not
        fs.stat(filePath, (error, stat) => {
            // if file does not exist
            if(error) {
                // use the mime type for txt file and a 404 message
                var contentType = mimeTypes['.txt']
                var fileContent = 'This is not the page that you are looking for. Its a 4 zero 4 error. (#dynamics)'

                // write the response head and body
                response.writeHead(404, {
                    'Content-Type': contentType,
                    'Content-Length': fileContent.length
                })
                response.end(fileContent, 'utf8')
            }
            else {
                // call the required module for dynamically serving the required page
                var page = require(filePath).serve(request, response, requestBody)
            }
        })
    }

    // for static pages
    else {
        // obtain the file path and the extension
        var filePath = path.join(webroot, uri.pathname)
        var fileExtension = path.extname(filePath)
        
        // get a suitable mime type
        var contentType = mimeTypes[fileExtension] || mimeTypes['other']

        // read the file
        fs.readFile(filePath, (error, fileContent) => {
            // in case there is error reading the file
            if(error) {
                // use the mime type for txt file and a 404 message
                contentType = mimeTypes['.txt']
                fileContent = 'This is not the page that you are looking for. Its a 4 zero 4 error.'

                // write the response head and body
                response.writeHead(404, {
                    'Content-Type': contentType,
                    'Content-Length': fileContent.length
                })
                response.end(fileContent, 'utf8')
            }
            else {
                // write the response head and body
                response.writeHead(200, {
                    'Content-Type': contentType,
                    'Content-Length': fileContent.length
                })
                response.end(fileContent, 'utf-8')
            }
        })
    }
}

// make the HTTP server listen to specified port
webServer.listen(port)
// print a message
printWithTime(`web server now running at port ${port}`)
