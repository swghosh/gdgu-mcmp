var http = require('http')

const apiURL = 'http://swghosh.pythonanywhere.com/gdgu-mcmp/api/sensorA'

exports.serve = (request, response) => {
    var content = ''

    var callbackOnError = (err) => {
        content = JSON.stringify({
            'error': 'Service Unavailable'
        })

        response.writeHead(503, {
            'Content-Type': 'application/json',
            'Content-Length': content.length
        })
        response.end(content, 'utf8')
    }

    var apiRequest = http.get(apiURL, (apiResponse) => {
        apiResponse.on('data', (chunk) => {
            content += chunk
        })
        apiResponse.on('end', () => {
            response.writeHead(200, {
                'Content-Type': 'application/json',
                'Content-Length': content.length
            })
            response.end(content, 'utf8')
        })
        apiResponse.on('error', callbackOnError)
    })

    apiRequest.on('error', callbackOnError)
}