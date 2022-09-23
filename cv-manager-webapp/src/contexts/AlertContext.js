import React, { useEffect, useState } from 'react'

import { ALERT_POSITIONS, ALERT_TYPES } from 'constants/enums'

export const AlertContext = React.createContext()

const ALERT_DURATION = 2000

const AlertContextProvider = (props) => {
    const [alert, setAlert] = useState('')
    const [type, setType] = useState(ALERT_TYPES.DEFAULT)
    const [position, setPosition] = useState(ALERT_POSITIONS.CENTER)

    useEffect(() => {
        const timer = setTimeout(() => setAlert(''), ALERT_DURATION)
        return () => {
            clearTimeout(timer)
        }
    }, [alert])

    const handleSetAlert = (
        data,
        alertType = ALERT_TYPES.DEFAULT,
        alertPosition = ALERT_POSITIONS.CENTER
    ) => {
        switch (alertType) {
            case ALERT_TYPES.SUCCESS:
            case ALERT_TYPES.DEFAULT:
                setAlert(data)
                break
            case ALERT_TYPES.ERROR:
                if (data.response) {
                    setAlert(
                        data.response?.data?.message ||
                            data?.response?.data?.detail
                    )
                } else if (data.message) {
                    setAlert(data.message)
                } else {
                    setAlert(data)
                }
                break
            default:
                setAlert('')
                break
        }
        setType(alertType)
        setPosition(alertPosition)
    }

    return (
        <AlertContext.Provider
            value={{
                alert,
                type,
                position,
                setAlert: handleSetAlert,
            }}
        >
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertContextProvider
