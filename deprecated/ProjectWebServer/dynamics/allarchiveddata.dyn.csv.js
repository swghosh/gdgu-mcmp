var dbConnect = require('../lib/dbconnect')
var objectFormatters = require('../lib/objectformatters')

const collectionName = 'sensorData'
const keys = [ 
    'timestamp',
    'latitude',
    'longitude',
    'sensorChannel',
    'sensorData' 
]

exports.serve = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'application/csv'
    })

    // write csv header line
    response.write(keys.join(",") + '\n')

    dbConnect((err, dbL) => {
        var db = dbL.db()

        db.collection(collectionName).find({}, (err, cursor) => {
            cursor.each((err, dataItem) => {
                if(dataItem == null) {
                    dbL.close()
                    response.end()
                    return
                }

                delete dataItem._id

                dataItem.sensorChannel = objectFormatters.objectFormatterA(dataItem.sensorChannel)
                dataItem.sensorData = objectFormatters.objectFormatterB(dataItem.sensorData)

                response.write(Object.values(dataItem).join(',') + '\n')
            })
        })
    })
}