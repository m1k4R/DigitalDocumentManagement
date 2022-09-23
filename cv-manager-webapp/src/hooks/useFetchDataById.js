import React, { useState, useEffect, useContext } from 'react'

import { AlertContext } from 'contexts/AlertContext'

import { getEntityByIdService } from 'services/entity.service'
import { ALERT_TYPES } from 'constants/enums'

const responseInitialState = {
    data: null,
    isLoading: false,
    error: null,
}

const useFetchDataById = (
    entity,
    id,
    params = {},
    reload,
    condition = true,
    isJSONAPI = true,
    apiUrl
) => {
    const { setAlert } = useContext(AlertContext) || {}

    const [response, setResponse] = useState(responseInitialState)

    useEffect(() => {
        const getData = async () => {
            try {
                setResponse({ ...responseInitialState, isLoading: true })
                const responseData = await getEntityByIdService(
                    entity,
                    id,
                    params,
                    isJSONAPI,
                    apiUrl
                )
                setResponse({
                    data: responseData,
                    isLoading: false,
                    error: null,
                })
            } catch (error) {
                setResponse({ ...responseInitialState, error })
                setAlert(error, ALERT_TYPES.ERROR)
            }
        }
        if (id && condition) {
            getData()
        }
    }, [id, reload])

    return response
}

export default useFetchDataById
