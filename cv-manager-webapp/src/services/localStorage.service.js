const USER_TOKEN = 'webapp_user_token'
const USER_ID = 'webapp_user_id'
const USER_LANGUAGE = 'webapp_user_language_code'

export const getUserToken = () => {
    return localStorage.getItem(USER_TOKEN)
}

export const setUserToken = (token) => {
    localStorage.setItem(USER_TOKEN, token)
}

export const deleteUserToken = () => {
    localStorage.removeItem(USER_TOKEN)
}

export const getUserId = () => {
    return Number(localStorage.getItem(USER_ID))
}

export const setUserId = (id) => {
    localStorage.setItem(USER_ID, id)
}

export const deleteUserId = () => {
    localStorage.removeItem(USER_ID)
}

export const getUserLanguage = () => {
    return localStorage.getItem(USER_LANGUAGE)
}

export const setUserLanguage = (code) => {
    localStorage.setItem(USER_LANGUAGE, code)
}

export const deletUserLanguage = () => {
    localStorage.removeItem(USER_LANGUAGE)
}

export const clearStorage = () => {
    deleteUserToken()
    deleteUserId()
    deletUserLanguage()
}
