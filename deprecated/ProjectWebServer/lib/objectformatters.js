exports.objectFormatterA = anObject => Object.values(anObject).join(' ')

exports.objectFormatterB = anObject => Object.keys(anObject)
                                              .map(key => `${key} ${objectFormatterA(anObject[key])}`)
                                              .join('; ')
