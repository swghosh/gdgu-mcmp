import template
import json

def view(kind = 'html', message = 'Error occured.'):
    if kind == 'html':
        return template.templatify({
            'content': 'Some error is keeping you away from accessing this page. Hard Luck :('
        })
    elif kind == 'json':
        return json.dumps({
            'error': message
        })
    else:
        return None