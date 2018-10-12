from datetime import datetime

# GDGU co-ordinates
LATITUDE = 28.2699415
LONGITUDE = 77.0636767

def getData(kind = 'default'):
    return {
        'timestamp': datetime.utcnow().isoformat(),
        'latitude': LATITUDE,
        'longitude': LONGITUDE,
        'sensorData': {
            kind: {
                'value': 100,
                'unit': '%'
            }
        }
    }
