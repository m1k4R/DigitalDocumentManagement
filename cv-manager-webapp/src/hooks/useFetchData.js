import React, { useState, useEffect, useContext } from 'react'

import { AlertContext } from 'contexts/AlertContext'

import { getEntityService } from 'services/entity.service'

import { ALERT_TYPES } from 'constants/enums'

const responseInitialState = {
    data: [],
    meta: null,
    isLoading: false,
    error: null,
}

const useFetchData = (
    entity,
    params = {},
    reload,
    condition = true,
    isJSONAPI = true,
    apiUrl
) => {
    const [response, setResponse] = useState(responseInitialState)

    const { setAlert } = useContext(AlertContext)

    useEffect(() => {
        const getData = async () => {
            try {
                setResponse({ ...responseInitialState, isLoading: true })
                const responseData = await getEntityService(
                    entity,
                    params,
                    isJSONAPI,
                    apiUrl
                )
                setResponse({ ...responseData, isLoading: false, error: null })
            } catch (error) {
                setResponse({ ...responseInitialState, error })
                setAlert(error, ALERT_TYPES.ERROR)
            }
        }
        if (entity && condition) {
            getData()
        }
    }, [reload])

    return response
}

export default useFetchData
