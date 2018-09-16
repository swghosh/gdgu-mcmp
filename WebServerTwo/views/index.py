import template
def view():
    return template.templatify({
        'content': template.templatify({}, './html/index.html')
    })