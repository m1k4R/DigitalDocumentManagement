import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'

import { AlertContext } from 'contexts/AlertContext'

import { getEntityService } from 'services/entity.service'

import { ALERT_TYPES } from 'constants/enums'

import useQueryParams from './useQueryParams'

const responseInitialState = {
    data: [],
    meta: null,
    isLoading: false,
    error: null,
}

const useFetchPaginatedData = (
    entity,
    params = {},
    reload,
    condition = true,
    isJSONAPI = true,
    apiUrl
) => {
    const { page, itemsPerPage, sort, ...filterParams } = useQueryParams()

    const [response, setResponse] = useState(responseInitialState)

    const { setAlert } = useContext(AlertContext)

    const queryParams = useLocation().search

    useEffect(() => {
        const getData = async () => {
            try {
                setResponse({ ...responseInitialState, isLoading: true })
                const responseData = await getEntityService(
                    entity,
                    {
                        ...params,
                        ...filterParams,
                        page,
                        itemsPerPage,
                        sort: sort || params.sort,
                    },
                    isJSONAPI,
                    apiUrl
                )
                setResponse({ ...responseData, isLoading: false, error: null })
            } catch (error) {
                setResponse({ ...responseInitialState, error })
                setAlert(error, ALERT_TYPES.ERROR)
            }
        }
        if (condition) {
            getData()
        }
    }, [reload, queryParams])

    return response
}

export default useFetchPaginatedData
