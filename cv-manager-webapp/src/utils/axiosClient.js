import axios from 'axios'

import { getUserToken, clearStorage } from 'services/localStorage.service'

export const BASE_URL = process.env.REACT_APP_API_HOST
export const BASE_FILE_URL = process.env.REACT_APP_FILE_URL

export const GET = 'get'
export const POST = 'post'
export const PUT = 'put'
export const PATCH = 'patch'
export const DELETE = 'delete'

export const RESPONSE_TYPE = {
    JSON: 'json',
    ARRAY_BUFFER: 'arraybuffer',
}

const axiosClient = (
    action,
    path,
    data,
    isJSONAPi = true,
    apiUrl = BASE_URL,
    responseType = RESPONSE_TYPE.JSON
) => {
    const token = getUserToken()
    const options = {
        headers: {
            'Content-Type': isJSONAPi
                ? 'application/vnd.api+json'
                : 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    }
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`
    }

    if (action === DELETE && data) {
        options.data = data
    }

    axios.interceptors.response.use(
        function (response) {
            return response
        },
        function (error) {
            if (
                error?.response?.status === 401 ||
                error?.response?.status === 409
            ) {
                clearStorage()
            }
            return Promise.reject(error)
        }
    )

    if (action === GET || action === DELETE) {
        return axios[action](`${apiUrl}/api${path}`, options)
    }

    return axios[action](`${apiUrl}/api${path}`, data, options, responseType)
}

export default axiosClient
