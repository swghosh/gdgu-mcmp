from models import archiveddata
import template

sensorData = archiveddata.get()

def view():
    return template.templatify({
        'content': str(sensorData)
    })