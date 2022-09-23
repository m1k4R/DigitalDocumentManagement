import React, { useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { I18n } from 'react-polyglot'

import { TranslationContext } from 'contexts/TranslationContext'

import { getUserToken } from 'services/localStorage.service'

import AuthRoutes from 'routes/AuthRoutes'
import NoAuthRoutes from 'routes/NoAuthRoutes'

import Alert from 'components/Alert'

const App = () => {
    const token = getUserToken()

    const {
        translations: { locale, messages },
    } = useContext(TranslationContext)

    return (
        <I18n locale={locale} messages={messages}>
            <BrowserRouter>
                <Alert />
                {token ? <AuthRoutes /> : <NoAuthRoutes />}
            </BrowserRouter>
        </I18n>
    )
}

export default App
