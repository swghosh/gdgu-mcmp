#!/usr/bin/env node

var http = require('http')
var fs = require('fs')
var path = require('path')
var url = require('url')

const port = process.env.port || 5000
const webroot = path.join(__dirname, 'htdocs')
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

var printWithTime = (message, error) => {
    var timedMessage = `[${new Date().toDateString()} ${new Date().toTimeString()}] : ${message}`

    if(error) {
        console.error(timedMessage)
    }
    else {
        console.log(timedMessage)
    }
}

var webServer = http.createServer((request, response) => {
    var requestBody = ''

    request.on('data', (chunk) => {
        if(requestBody.length > 1e6) request.connection.destroy()
        else requestBody += chunk
    })

    request.on('end', () => {
        prepareForResponse(request, response, requestBody)
    })

    request.on('error', (err) => {
        printWithTime('request error', true)
    })
})

var prepareForResponse = (request, response, requestBody) => {
    printWithTime(`${request.url} was requested`)

    var uri = url.parse(path.normalize(request.url))

    if(uri.pathname == '/') {
        uri.pathname = '/index.html'
    }

    var filePath = path.join(webroot, uri.pathname)
    var fileExtension = path.extname(filePath)
    
    var contentType = mimeTypes[fileExtension] || mimeTypes['other']

    fs.readFile(filePath, (error, fileContent) => {
        if(error) {
            contentType = mimeTypes['.txt']
            fileContent = 'This is not the page that you are looking for. Its a 4 zero 4 error.'
        }

        response.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': fileContent.length
        })
        response.end(fileContent, 'utf-8')
    })
}

webServer.listen(port)
printWithTime(`web server now running at port ${port}`)
