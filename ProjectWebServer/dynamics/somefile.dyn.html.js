exports.serve = (request, response, requestBody) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    })
    response.end('Hello World!')
}