import template
def view():
    return template.templatify({
        'content': 'Some error is keeping you away from accessing this page. Hard Luck :('
    })