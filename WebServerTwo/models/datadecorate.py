import preset
def decorate(sensorData, index):
    modifiedSensorData = sensorData
    paramName = preset.preset[sensorData['sensorChannel']['name']][index]
    modifiedSensorData[paramName] = sensorData['sensorData'][paramName]
    modifiedSensorData.pop('sensorChannel')
    modifiedSensorData.pop('sensorData')
    return modifiedSensorData
