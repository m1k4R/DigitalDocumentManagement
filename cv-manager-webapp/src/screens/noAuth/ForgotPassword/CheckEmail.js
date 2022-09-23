import React, { useContext } from 'react'
import { useTranslate } from 'react-polyglot'

import { forgotPasswordService } from 'services/auth.service'

import { AlertContext } from 'contexts/AlertContext'

import Button from 'components/Button'
import { ALERT_TYPES, BUTTON_STATUS, BUTTON_TYPE } from 'constants/enums'

const CheckEmail = ({ email }) => {
    const t = useTranslate()

    const { setAlert } = useContext(AlertContext)

    const handleSubmit = async () => {
        try {
            await forgotPasswordService({ email }, false)
            setAlert('message.success.successfully', ALERT_TYPES.SUCCESS)
        } catch (error) {
            setAlert(error, ALERT_TYPES.ERROR)
        }
    }

    return (
        <div className="m-form -login">
            <div className="m-form__title">
                <h2>Check your email</h2>
                <span>
                    We’ve sent you an email with your new password, just click
                    the link.
                </span>
            </div>
            <Button
                buttonClass={BUTTON_STATUS.PRIMARY}
                type={BUTTON_TYPE.BUTTON}
                onClick={handleSubmit}
                label="button.sendAgain"
            />
        </div>
    )
}

export default CheckEmail
