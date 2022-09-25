import axios, { DELETE, GET, PATCH, POST } from 'utils/axiosClient'
import {
    formatRequestData,
    formatResponseData,
    formatUrl,
} from 'utils/jsonApiFormatters'

export const getEntityService = async (
    entity,
    params,
    isJSONAPI = true,
    apiUrl
) => {
    try {
        const PATH = `/${entity}`
        const url = formatUrl(PATH, params)
        const response = await axios(GET, url, null, isJSONAPI, apiUrl)
        if (!isJSONAPI) {
            return response.data
        } else {
            const { data, meta } = formatResponseData(response.data)
            return { data, meta }
        }
    } catch (error) {
        throw error
    }
}

export const getEntityByIdService = async (
    entity,
    id,
    params,
    isJSONAPI = true,
    apiUrl,
    responseType
) => {
    try {
        const PATH = `/${entity}/${id}`
        const url = formatUrl(PATH, params)
        const response = await axios(GET, url, null, isJSONAPI, apiUrl, responseType)
        if (!isJSONAPI) {
            return response.data
        } else {
            const { data } = formatResponseData(response.data)
            return data
        }
    } catch (error) {
        throw error
    }
}

export const createEntityService = async (
    entity,
    formData,
    isJSONAPI = true,
    apiUrl
) => {
    try {
        const preparedData = isJSONAPI
            ? formatRequestData(entity, formData)
            : formData
        const response = await axios(
            POST,
            `/${entity}`,
            preparedData,
            isJSONAPI,
            apiUrl
        )
        if (!isJSONAPI) {
            return response.data
        } else {
            const { data, meta } = formatResponseData(response.data)
            return { data, meta }
        }
    } catch (error) {
        throw error
    }
}

export const editEntityService = async (
    entity,
    id,
    formData,
    isJSONAPI = true,
    apiUrl
) => {
    try {
        const preparedData = isJSONAPI
            ? formatRequestData(entity, formData)
            : formData
        const response = await axios(
            PATCH,
            `/${entity}/${id}`,
            preparedData,
            isJSONAPI,
            apiUrl
        )
        if (!isJSONAPI) {
            return response.data
        } else {
            const { data, meta } = formatResponseData(response.data)
            return { data, meta }
        }
    } catch (error) {
        throw error
    }
}

export const deleteEntityService = async (
    entity,
    id,
    isJSONAPI = true,
    apiUrl
) => {
    try {
        await axios(DELETE, `/${entity}/${id}`, null, isJSONAPI, apiUrl)
    } catch (error) {
        throw error
    }
}
