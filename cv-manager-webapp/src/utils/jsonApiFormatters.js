const isEmpty = (obj) => {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false
        }
    }
    return JSON.stringify(obj) === JSON.stringify({})
}

const formatUrl = (url, urlParams) => {
    if (urlParams) {
        url = url.concat('?')
        Object.keys(urlParams).forEach((key) => {
            if (key === 'sortOrder') {
                if (urlParams[key].sortKey && urlParams[key].sortValue) {
                    const sign = urlParams[key].sortValue < 0 ? '-' : ''
                    url = url.concat(`sort=${sign}${urlParams[key].sortKey}&`)
                }
            } else {
                if (
                    urlParams[key] !== null &&
                    urlParams[key] !== undefined &&
                    urlParams[key] !== ''
                ) {
                    url = url.concat(`${key}=${urlParams[key]}&`)
                }
            }
        })
        url = url.slice(0, -1)
    }
    return url
}

const formatRequestData = (type, formData) => {
    const data = { ...formData }
    let retVal = {
        data: {
            type,
            attributes: {},
            relationships: {},
        },
    }
    if (data && typeof data === 'object') {
        if (data._id) {
            retVal.data['id'] = data._id
        }
        for (const key in data) {
            // Multiple Relationship
            if (data[key] && Array.isArray(data[key])) {
                retVal.data.relationships[key] = {
                    data: [],
                }
                data[key].forEach((item) => {
                    if (item.id && item.entityType) {
                        retVal.data.relationships[key].data.push({
                            id: item.id,
                            type: item.entityType,
                        })
                    }
                })
                delete data[key]
                // Single Relationship
            } else if (data[key] && typeof data[key] === 'object') {
                if (data[key].id && data[key].entityType) {
                    retVal.data.relationships[key] = {
                        data: {},
                    }
                    retVal.data.relationships[key].data.type =
                        data[key].entityType
                    retVal.data.relationships[key].data.id = Number(
                        data[key].id
                    )
                    delete data[key]
                }
                // Base Attributes
            } else {
                retVal.data.attributes[key] = data[key]
            }
        }
        retVal.data.attributes = Object.assign(data)
    }
    if (isEmpty(retVal.data.relationships)) {
        delete retVal.data.relationships
    }

    return retVal
}

function getRelationships(relationships, included) {
    let relationAttributes = {}
    Object.keys(relationships).forEach((key) => {
        if (included) {
            if (Array.isArray(relationships[key].data)) {
                const retVal = included
                    .filter((item) => {
                        return relationships[key].data.some(
                            (relation) =>
                                relation.type === item.type &&
                                relation.id === item.id
                        )
                    })
                    .map((item) =>
                        Object.assign(item.attributes, {
                            id: item.id,
                            entityType: item.type,
                            relationships: item.relationships,
                        })
                    )
                relationAttributes = Object.assign(relationAttributes, {
                    [key]: retVal,
                })
            } else {
                included.forEach((includedItem) => {
                    if (
                        includedItem.id === relationships[key].data.id &&
                        includedItem.type === relationships[key].data.type
                    ) {
                        relationAttributes = Object.assign(relationAttributes, {
                            [key]: Object.assign(includedItem.attributes, {
                                id: includedItem.id,
                                entityType: includedItem.type,
                                relationships: includedItem.relationships,
                            }),
                        })
                    }
                })
            }
        } else {
            relationAttributes = Object.assign(relationAttributes, {
                [key]: relationships[key]['data'],
            })
        }
    })
    return relationAttributes
}

const formatResponseData = (data) => {
    let retVal = {
        data: null,
        meta: null,
    }

    let relationAttributes = null

    // GET ALL RECORDS
    if (Array.isArray(data['data'])) {
        retVal.data = []
        data['data'].forEach((item) => {
            if (item['relationships']) {
                relationAttributes = getRelationships(
                    item['relationships'],
                    data['included']
                )
            } else {
                relationAttributes = null
            }
            retVal.data.push(
                Object.assign(
                    { id: item.id, entityType: item.type },
                    item.attributes,
                    relationAttributes
                )
            )
        })
        // GET SINGLE RECORD
    } else {
        if (data['data']['relationships']) {
            relationAttributes = getRelationships(
                data['data']['relationships'],
                data['included']
            )
        } else {
            relationAttributes = null
        }
        retVal.data = Object.assign(
            { id: data['data'].id, entityType: data['data'].type },
            data['data'].attributes,
            relationAttributes
        )
    }

    if (data['meta']) {
        retVal.meta = Object.assign(data['meta'])
    }
    return retVal
}

export { formatUrl, formatRequestData, formatResponseData }
