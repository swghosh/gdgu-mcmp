var dbConnect = require('../lib/dbconnect')

const collectionName = 'sensorData'
const defaultArrayLimit = 50

/**
 * 
 * @param {*} sensorChannel must include either name and or id property
 * @param {*} options may include limited and or limit property
 * @param {*} callback must be a single argument function
 */
exports.getSensorData = (sensorChannel, options, callback) => {

    var arrayLimit = (options.limited) ? ((options.limit) ? options.limit : defaultArrayLimit) : 0

    var querySensorChannel = Object.keys(sensorChannel).map((key) => {
        var newKey = 'sensorChannel.' + key
        return [newKey, sensorChannel[key]]
    }).reduce((previous, current) => {
        var key, value
        [key, value] = current
        previous[key] = value
        return previous
    }, {})

    dbConnect((err, dbLink) => {
        if(err) {
            callback({
                "error": "service unavailable"
            })
        }
        else {
            var db = dbLink.db()

            db.collection(collectionName).find(querySensorChannel).sort({
                timestamp: -1
            }).limit(arrayLimit).toArray((err, documents) => {
                dbLink.close()

                if(err) {
                    callback({
                        "error": "find failed"
                    })
                }
                else {
                    // sort documents ascending based on timestamp property
                    documents = documents.sort((itemA, itemB) => itemA.timestamp.localeCompare(itemB.timestamp))
                    callback(documents)
                }
            })
        }
    })
}
