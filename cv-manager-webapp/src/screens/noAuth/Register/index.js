import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslate } from 'react-polyglot'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { AlertContext } from 'contexts/AlertContext'

import { registerUserService } from 'services/auth.service'

import ROUTES from 'constants/routes'
import { REGEXP_PASSWORD } from 'constants/regex'
import {
    ALERT_TYPES,
    BUTTON_STATUS,
    BUTTON_TYPE,
    INPUT_FILED_TYPE,
} from 'constants/enums'

import Button from 'components/Button'
import InputField from 'components/formFields/InputField'

const Register = () => {
    const t = useTranslate()
    const navigate = useNavigate()

    const { setAlert } = useContext(AlertContext)

    const handleSubmit = async (formData, { setSubmitting }) => {
        try {
            setSubmitting(true)
            await registerUserService(formData)
            setSubmitting(false)
            navigate(ROUTES.LOGIN)
        } catch (error) {
            setAlert(error, ALERT_TYPES.ERROR)
        }
    }

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
    }

    const requiredMessage = t('form.error.required')

    const validation = Yup.object({
        firstName: Yup.string().required(requiredMessage),
        lastName: Yup.string().required(requiredMessage),
        email: Yup.string()
            .email(t('form.error.invalidEmail'))
            .required(requiredMessage),
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
        <div className="m-form -register">
            <div className="m-form__title">
                <span>Create an account</span>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validation}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="_w">
                            <div className="_l12">
                                <InputField
                                    type={INPUT_FILED_TYPE.TEXT}
                                    name="email"
                                    label="form.label.email"
                                    placeholder="form.placeholder.emailExample"
                                    icon="email"
                                    required
                                />
                            </div>
                            <div className="_l12">
                                <InputField
                                    type={INPUT_FILED_TYPE.TEXT}
                                    name="firstName"
                                    label="form.label.firstName"
                                    placeholder="form.label.firstName"
                                    icon="user"
                                    required
                                />
                            </div>
                            <div className="_l12">
                                <InputField
                                    type={INPUT_FILED_TYPE.TEXT}
                                    name="lastName"
                                    label="form.label.lastName"
                                    placeholder="form.label.lastName"
                                    icon="user"
                                    required
                                />
                            </div>

                            <div className="_l12">
                                <InputField
                                    type={INPUT_FILED_TYPE.PASSWORD}
                                    name="password"
                                    label="form.label.password"
                                    placeholder="form.placeholder.characterMin"
                                    icon="lock"
                                    required
                                />
                            </div>
                            <div className="_l12">
                                <InputField
                                    type={INPUT_FILED_TYPE.PASSWORD}
                                    name="repeatPassword"
                                    label="form.label.repeatPassword"
                                    placeholder="form.placeholder.characterMin"
                                    icon="lock"
                                    required
                                />
                            </div>
                        </div>
                        <Button
                            buttonClass={BUTTON_STATUS.PRIMARY}
                            type={BUTTON_TYPE.SUBMIT}
                            label="button.createAccount"
                            isLoading={isSubmitting}
                        />
                    </Form>
                )}
            </Formik>
            <span className="m-form__link">
                {t('links.alreadyHave')}{' '}
                <Link to={ROUTES.LOGIN}>{t('links.logIn')}</Link>
            </span>
        </div>
    )
}

export default Register
