import axios, { GET, PATCH, POST } from 'utils/axiosClient'
import { formatRequestData } from 'utils/jsonApiFormatters'

import {
    setUserId,
    setUserToken,
    deleteUserToken,
    deleteUserId,
} from './localStorage.service'

import ENTITY from 'constants/entities'

export const loginService = async (formData, apiUrl) => {
    try {
        const { data } = await axios(
            POST,
            '/public/login',
            formData,
            false,
            apiUrl
        )
        if (data.token) {
            setUserToken(data.token)
            setUserId(data.userId)
        }
        return data
    } catch (error) {
        throw error
    }
}

export const registerUserService = async (data, isJSONAPI = true, apiUrl) => {
    try {
        const preparedData = isJSONAPI
            ? formatRequestData(ENTITY.USER, data)
            : data
        await axios(POST, '/users/register', preparedData, isJSONAPI, apiUrl)
    } catch (error) {
        throw error
    }
}

export const forgotPasswordService = async (
    formData,
    isJSONAPI = true,
    apiUrl
) => {
    try {
        const preparedData = isJSONAPI
            ? formatRequestData(ENTITY.USER, formData)
            : formData
        const response = await axios(
            POST,
            '/users/forgot_password',
            preparedData,
            isJSONAPI,
            apiUrl
        )
        return response
    } catch (error) {
        throw error
    }
}

export const resetPasswordService = async (data, isJSONAPI = true, apiUrl) => {
    try {
        const { token, ...restData } = data
        const preparedData = isJSONAPI
            ? formatRequestData(ENTITY.USER, restData)
            : restData
        await axios(
            PATCH,
            `/users/${token}/reset_password`,
            preparedData,
            isJSONAPI,
            apiUrl
        )
    } catch (error) {
        throw error
    }
}
