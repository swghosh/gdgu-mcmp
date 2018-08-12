var dbConnect = require('../lib/dbconnect')

const collectionName = 'sensorData'
const keys = [ 
    'timestamp',
    'latitude',
    'longitude',
    'sensorChannel',
    'sensorData' 
]

const objectFormatterA = anObject => Object.values(anObject).join(' ')
const objectFormatterB = anObject => Object.keys(anObject).map(key => `${key} ${objectFormatterA(anObject[key])}`).join('; ')


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

                dataItem.sensorChannel = objectFormatterA(dataItem.sensorChannel)
                dataItem.sensorData = objectFormatterB(dataItem.sensorData)

                response.write(Object.values(dataItem).join(',') + '\n')
            })
        })
    })
}