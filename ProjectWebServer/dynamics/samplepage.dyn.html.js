var fs = require('fs')
var path = require('path')
var htmldyn = require('../lib/htmldynmodule')

exports.serve = (request, response) => {
    fs.readFile(path.join(__dirname, '../files', 'template.html'), 'utf8', (err, data) => {

        response.writeHead(200, {
            'Content-Type': 'text/html'
        })

        response.end(htmldyn.getHtmlStringWithIdValues(data, {
            content: htmldyn.getHtmlTagString('div', 'Hello world', 'content')
        }), 'utf-8')
    })
}