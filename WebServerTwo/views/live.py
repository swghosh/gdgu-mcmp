from models import livedata
import template

sensorData = livedata.get()

def view():
    return template.templatify({
        'content': str(sensorData)
    })