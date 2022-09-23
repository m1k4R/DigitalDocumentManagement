import React, { Children } from 'react'

import AlertContextProvider from './AlertContext'
import CurrentUserContextProvider from './CurrentUserContext'
import TranslationContextProvider from './TranslationContext'

const AppContext = ({ children }) => {
    return (
        <CurrentUserContextProvider>
            <TranslationContextProvider>
                <AlertContextProvider>
                    {Children.only(children)}
                </AlertContextProvider>
            </TranslationContextProvider>
        </CurrentUserContextProvider>
    )
}

export default AppContext
