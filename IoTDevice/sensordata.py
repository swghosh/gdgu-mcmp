from datetime import datetime
import geolocation

def getData(kind = 'default'):
    location = geolocation.geolocation()
    return {
        'timestamp': datetime.utcnow().isoformat(),
        'latitude': location['location']['lat'],
        'longitude': location['location']['lng'],
        'accuracy': location['accuracy'],
        'sensorData': {
            kind: {
                'value': 100,
                'unit': '%'
            }
        }
    }
