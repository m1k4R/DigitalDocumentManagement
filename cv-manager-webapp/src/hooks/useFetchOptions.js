/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react'

import { AlertContext } from 'contexts/AlertContext'

import { getEntityService } from 'services/entity.service'

import { ALERT_TYPES } from 'constants/enums'

// Custom Hook for fetching options for Select and Multiselect fields with search and infinit scroll

const useFetchOptions = (
    entity,
    params = {},
    reload,
    condition = true,
    defaultOptions = [],
    isJSONAPI = true,
    apiUrl
) => {
    const [options, setOptions] = useState(defaultOptions)
    const [isLoading, setIsLoading] = useState(false)
    const [isFetched, setIsFetched] = useState(false)

    const { setAlert } = useContext(AlertContext)

    // This hook should change on every param change
    // Destruct everything that is passed in params and add it in dependency array
    const {
        page,
        itemsPerPage,
        name,
        search,
        ['company.id']: companyId,
    } = params

    const allowedFetch = entity && condition && defaultOptions.length < 1

    // On specific params change, page is set to 1, fetch new data
    useEffect(() => {
        if (allowedFetch && isFetched) {
            getData({ ...params, page: 1 })
        }
    }, [reload, name, search, companyId])

    useEffect(() => {
        if (allowedFetch) {
            getData(params)
            setIsFetched(true)
        }
    }, [page, itemsPerPage])
    // TODO:: on search change page is set to 1 like companyId?

    // Clean options on entityType change
    useEffect(() => {
        return () => setOptions([])
    }, [entity])

    const getData = async (requestParams) => {
        try {
            setIsLoading(true)
            const { data } = await getEntityService(
                entity,
                requestParams,
                isJSONAPI,
                apiUrl
            )
            // On search param change, page is set to 1, show only new data
            if (requestParams.page === 1) {
                setOptions(data)
            } else {
                setOptions((options) => [...options, ...data])
            }
            if (data.length < itemsPerPage) {
                setIsLoading(false)
            }
        } catch (error) {
            setOptions([])
            setIsLoading(false)
            setAlert(error, ALERT_TYPES.ERROR)
        }
    }

    return { options, isLoading }
}

export default useFetchOptions
