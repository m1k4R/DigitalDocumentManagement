import React, { useContext } from 'react'
import { useTranslate } from 'react-polyglot'

import { AlertContext } from 'contexts/AlertContext'

import { ALERT_TYPES } from 'constants/enums'

import Icon from 'components/Icon'

const Alert = () => {
    const t = useTranslate()
    const { alert, type, position, setAlert } = useContext(AlertContext)

    if (!alert) return null

    return (
        <span
            className={`a-alert -${type} -${position}`}
            onClick={() => setAlert('')}
        >
            {type === ALERT_TYPES.DEFAULT && (
                <Icon name="smile" color="#fff" size={24} />
            )}
            {t(alert)}
        </span>
    )
}

export default Alert
