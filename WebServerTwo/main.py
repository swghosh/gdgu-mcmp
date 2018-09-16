import controller

def app(environ, startResponse):
    data, headers, status = controller.serve(environ)

    headers.append(
        ('Content-Length', str(len(data)))
    )

    startResponse(status, headers)

    return [data.encode('utf-8')]
