var fs = require('fs')
var path = require('path')
var htmldyn = require('../lib/htmldynmodule')

exports.serve = (request, response) => {
    fs.readFile(path.join(__dirname, '../files', 'template.html'), 'utf8', (err, templateData) => {

        fs.readFile(path.join(__dirname, '../files', 'browsestations.html'), 'utf8', (err, contentData) => {

            response.writeHead(200, {
                'Content-Type': 'text/html'
            })
    
            response.end(htmldyn.getHtmlStringWithIdValues(templateData, {
                content: contentData
            }), 'utf-8')

        })

    })
}