import React, { useContext } from 'react'
import { useTranslate } from 'react-polyglot'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import { AlertContext } from 'contexts/AlertContext'

import { REGEXP_PASSWORD } from 'constants/regex'
import {
    ALERT_TYPES,
    BUTTON_STATUS,
    BUTTON_TYPE,
    INPUT_FILED_TYPE,
} from 'constants/enums'

import { resetPasswordService } from 'services/auth.service'

import ROUTES from 'constants/routes'

import InputField from 'components/formFields/InputField'
import Button from 'components/Button'

const ResetPassword = () => {
    const t = useTranslate()
    const { token } = useParams()
    const navigate = useNavigate()

    const { setAlert } = useContext(AlertContext)

    const handleSubmit = async (formData) => {
        try {
            await resetPasswordService({ ...formData, token }, false)
            setAlert('message.success.successfully', ALERT_TYPES.SUCCESS)
            navigate(ROUTES.LOGIN)
        } catch (error) {
            setAlert(error, ALERT_TYPES.ERROR)
        }
    }

    const initialValues = { password: '', repeatPassword: '' }

    const requiredMessage = t('form.error.required')

    const validate = Yup.object().shape({
        password: Yup.string()
            .min(8, t('form.error.minCharacter'))
            .matches(REGEXP_PASSWORD, t('form.error.mustContain'))
            .required(requiredMessage),
        repeatPassword: Yup.string()
            .min(8, t('form.error.minCharacter'))
            .oneOf(
                [Yup.ref('password'), null],
                t('form.error.passwordsMustMatch')
            )
            .required(requiredMessage),
    })

    return (
        <div className="m-form -login">
            <div className="m-form__title">
                <span>Reset password</span>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validate}
            >
                {() => (
                    <Form>
                        <InputField
                            type={INPUT_FILED_TYPE.PASSWORD}
                            name="password"
                            label="form.label.password"
                            placeholder="form.placeholder.newPassword"
                        />
                        <InputField
                            type={INPUT_FILED_TYPE.PASSWORD}
                            name="repeatPassword"
                            placeholder="form.label.repeatPassword"
                            label="form.label.repeatPassword"
                        />
                        <Button
                            type={BUTTON_TYPE.SUBMIT}
                            buttonClass={BUTTON_STATUS.PRIMARY}
                            label="button.submit"
                        />
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ResetPassword
