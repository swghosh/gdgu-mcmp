def templatify(dataDict, fileName = './html/template.html'):
    with open(fileName, 'r') as templateFile:
        html = templateFile.readlines()
    return ''.join(html).format(**dataDict)