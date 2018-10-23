import datetime
from gpiozero import LightSensor

import geolocation

READ_LIMIT = 10
DECIMAL_PLACES = 2

airQualSensorPin = 17
soilMoistSensorPin = 27

# calibration
soilMoistMaxL = 0.43
soilMoistMinL = 0.0

def mean(metricsList):
    return sum(metricsList) / len(metricsList)

def readAirQualIndex(airQualSensorPin = airQualSensorPin):
    airQualSensor = LightSensor(airQualSensorPin)

    telemetry = [airQualSensor.value for _ in range(READ_LIMIT)]
    reading = mean(telemetry) * 100
    
    return round(reading, DECIMAL_PLACES)

def readSoilMoist(soilMoistSensorPin = soilMoistSensorPin):
    soilMoistSensor = LightSensor(soilMoistSensorPin)

    telemetry = [soilMoistSensor.value for _ in range(READ_LIMIT)]
    reading = mean(telemetry)

    telemetry = 100 - (((reading - soilMoistMinL) * 100.0) / (soilMoistMaxL - soilMoistMinL))
    return round(telemetry, DECIMAL_PLACES)

def readFromSensor(kind):
    if kind == 'soilMoist':
        return readSoilMoist()
    elif kind == 'airQualIndex':
        return readAirQualIndex()
    
def getData():
    locationData = geolocation.geolocation(verbose = False)
    currentLocation = {
        'latitude': locationData['location']['lat'],
        'longitude': locationData['location']['lng'],
        'accuracy': locationData['accuracy']
    }
    return [{
        'timestamp': datetime.datetime.utcnow().isoformat(),
        'latitude': currentLocation['latitude'],
        'longitude': currentLocation['longitude'],
        'accuracy': currentLocation['accuracy'],
        'sensorData': {
            kind: {
                'value': readFromSensor(kind),
                'unit': '%'
            }
        }
    } for kind in ('soilMoist', 'airQualIndex')]
