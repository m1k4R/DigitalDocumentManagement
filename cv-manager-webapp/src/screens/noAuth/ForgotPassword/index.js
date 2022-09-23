import React, { useContext, useState } from 'react'
import { useTranslate } from 'react-polyglot'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import {
    ALERT_TYPES,
    BUTTON_STATUS,
    BUTTON_TYPE,
    INPUT_FILED_TYPE,
} from 'constants/enums'

import { forgotPasswordService } from 'services/auth.service'

import { AlertContext } from 'contexts/AlertContext'

import InputField from 'components/formFields/InputField'
import Button from 'components/Button'
import CheckEmail from './CheckEmail'

const ForgotPassword = () => {
    const t = useTranslate()

    const { setAlert } = useContext(AlertContext)
    const [checkEmail, setCheckEmail] = useState(null)

    const handleSubmit = async (formData) => {
        try {
            await forgotPasswordService(formData, false)
            setCheckEmail(formData.email)
            setAlert('message.success.successfully', ALERT_TYPES.SUCCESS)
        } catch (error) {
            setAlert(error, ALERT_TYPES.ERROR)
        }
    }

    const initialValues = {
        email: '',
    }

    const requiredMessage = t('form.error.required')

    const validation = Yup.object({
        email: Yup.string()
            .email(t('form.error.invalidEmail'))
            .required(requiredMessage),
    })

    if (checkEmail) return <CheckEmail />

    return (
        <div className="m-form -login">
            <div className="m-form__title">
                <span>Forgot a password?</span>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validation}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        <InputField
                            name="email"
                            type={INPUT_FILED_TYPE.EMAIL}
                            label="form.label.email"
                            placeholder="form.label.email"
                            icon="email"
                            required
                        />
                        <Button
                            buttonClass={BUTTON_STATUS.PRIMARY}
                            type={BUTTON_TYPE.SUBMIT}
                            label="button.resetPassword"
                        />
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ForgotPassword
