var https = require('https')

const sensorDataUrl = 'https://swghosh.pythonanywhere.com/gdgu-mcmp/api/sensorData'

/**
 * 
 * @param {*} sensorChannel must include either name and or id property
 * @param {*} callback must be a single argument function
 */
exports.getSensorData = (sensorChannel, callback) => {
    var onError = () => {
        callback({
            "error": "service unavailable"
        })
    }

    var request = https.get(sensorDataUrl, (response) => {
        var content = ''
        response.on('data', (chunk) => {
            content += chunk
        })
        response.on('end', () => {
            var dataArray = []
            dataArray = JSON.parse(content)

            var requiredData = dataArray.filter((item) => {
                return Object.keys(sensorChannel).every((key) => {
                    return item.sensorChannel[key] == sensorChannel[key]
                })
            })
        })
        response.on('error', onError)
    })
    request.on('error', onError)
}