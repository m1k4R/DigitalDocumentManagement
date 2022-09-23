import React from 'react'
import ReactDOM from 'react-dom/client'

import AppContext from 'contexts/AppContext'

import App from 'App'

import 'index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <AppContext>
        <App />
    </AppContext>
)
