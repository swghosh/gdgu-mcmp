var dbConnect = require('../lib/dbconnect')

const collectionName = 'sensorData'
const arrayLimit = 50

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

    dbConnect((err, dbL) => {
        if(err) {
            callbackOnError(err)
        }
        else {
            var db = dbL.db()
            db.collection(collectionName).find({
                'sensorChannel.name': "GROUND-QUAL-SENSORS"
            }).limit(arrayLimit).toArray((err, documents) => {
                dbL.close()

                // pretty JSON with 4 spaces for each block indentation
                // also, remove objectId before emitting json
                content = JSON.stringify(documents.map((document) => {
                    delete document._id
                    return document
                }), undefined, 4)

                response.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Content-Length': content.length
                })
                response.end(content, 'utf8')
            })
        }
    })
}