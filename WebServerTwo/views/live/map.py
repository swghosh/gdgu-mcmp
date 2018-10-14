import template
def view(kind = ''):
    return template.templatify({
        'content': template.templatify({
            'kind': kind
        }, './html/map.html')
    })