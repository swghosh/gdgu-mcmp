import template
import preset
def view(kind = ''):
    return template.templatify({
        'content': template.templatify({
            'kind': kind,
            'extendedKind': preset.preset[kind]
        }, './html/graph.html')
    })