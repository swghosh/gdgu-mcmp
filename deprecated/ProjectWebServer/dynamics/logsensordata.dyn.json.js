var http = require('http')

const endpointUrl = 'http://asia-northeast1-gdgu-env-net.cloudfunctions.net/logSensorData'

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

    var endpointRequest = http.get(endpointUrl, (endpointResponse) => {
        endpointResponse.on('data', (chunk) => {
            content += chunk
        })
        endpointResponse.on('end', () => {
            response.writeHead(200, {
                'Content-Type': 'application/json',
                'Content-Length': content.length
            })
            response.end(content, 'utf8')
        })
        endpointResponse.on('error', callbackOnError)
    })

    endpointRequest.on('error', callbackOnError)
}