import React, { useEffect, useState } from 'react'

import { getUserId } from 'services/localStorage.service'

import useFetchDataById from 'hooks/useFetchDataById'

import ENTITY from 'constants/entities'

export const CurrentUserContext = React.createContext()

const CurrentUserContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null)

    const userId = getUserId()
    const { data, isLoading: isLoadingCurrentUser } = useFetchDataById(
        ENTITY.USER,
        userId,
        {
            include: 'language',
        }
    )

    useEffect(() => {
        setCurrentUser(data)
    }, [data])

    return (
        <CurrentUserContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                isLoadingCurrentUser,
                userId,
            }}
        >
            {props.children}
        </CurrentUserContext.Provider>
    )
}

export default CurrentUserContextProvider
