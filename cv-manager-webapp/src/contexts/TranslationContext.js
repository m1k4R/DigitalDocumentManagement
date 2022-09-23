import React, { useState, useEffect, useContext } from 'react'

import {
    editEntityService,
    getEntityByIdService,
} from 'services/entity.service'
import { getUserLanguage, setUserLanguage } from 'services/localStorage.service'

import { CurrentUserContext } from './CurrentUserContext'

import ENTITY from 'constants/entities'

const DEFAULT_LANGUAGE = 'en'

export const TranslationContext = React.createContext()

const TranslationContextProvider = (props) => {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext)

    const [translations, setTranslations] = useState({
        locale: DEFAULT_LANGUAGE,
        messages: require(`../translations/${DEFAULT_LANGUAGE}.json`),
    })

    useEffect(() => {
        // TODO:: Add this when the translations and the current user are connected

        // if (currentUser && currentUser.language) {
        //     setTranslations({
        //         locale: currentUser.language.code,
        //         messages: require(`../translations/${currentUser.language.code}.json`),
        //     })
        // } else {
        const currentLanguage = getUserLanguage() || DEFAULT_LANGUAGE
        setTranslations({
            locale: currentLanguage,
            messages: require(`../translations/${currentLanguage}.json`),
        })
        // }
    }, [currentUser])

    const handleSetTranslations = async (language) => {
        try {
            if (currentUser) {
                await editEntityService(ENTITY.USER, currentUser.id, {
                    language: { id: language.id, type: language.entityType },
                })
                const data = await getEntityByIdService(
                    ENTITY.USER,
                    currentUser.id,
                    { include: 'userRoles,language,avatar,package' }
                )
                setCurrentUser(data)
            } else {
                setTranslations({
                    locale: language.code,
                    messages: require(`../translations/${language.code}.json`),
                })
                setUserLanguage(language.code)
            }
        } catch (error) {
            throw error
        }
    }

    const { locale, messages } = translations
    if (!locale || !messages) return null

    return (
        <TranslationContext.Provider
            value={{
                translations,
                setTranslations: handleSetTranslations,
            }}
        >
            {props.children}
        </TranslationContext.Provider>
    )
}

export default TranslationContextProvider
