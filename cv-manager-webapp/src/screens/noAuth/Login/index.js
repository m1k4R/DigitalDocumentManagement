import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslate } from 'react-polyglot'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import ROUTES from 'constants/routes'
import ENTITY from 'constants/entities'
import {
    ALERT_TYPES,
    BUTTON_STATUS,
    BUTTON_TYPE,
    INPUT_FILED_TYPE,
} from 'constants/enums'

import { loginService } from 'services/auth.service'
import { getEntityByIdService } from 'services/entity.service'

import { AlertContext } from 'contexts/AlertContext'
import { CurrentUserContext } from 'contexts/CurrentUserContext'

import InputField from 'components/formFields/InputField'
import Button from 'components/Button'

const Login = () => {
    const t = useTranslate()
    const navigate = useNavigate()

    const { setAlert } = useContext(AlertContext)
    const { setCurrentUser } = useContext(CurrentUserContext)

    const handleSubmit = async (formData) => {
        try {
            const loginData = await loginService(formData)
            const { userId } = loginData
            if (userId) {
                const data = await getEntityByIdService(ENTITY.USER, userId, {
                    include: 'role',
                })
                setCurrentUser(data)
                navigate(ROUTES.HOME)
            }
        } catch (error) {
            setAlert(error, ALERT_TYPES.ERROR)
        }
    }

    const initialValues = {
        email: '',
        password: '',
    }

    const requiredMessage = t('form.error.required')

    const validation = Yup.object({
        email: Yup.string()
            .email(t('form.error.invalidEmail'))
            .required(requiredMessage),
        password: Yup.string().required(requiredMessage),
    })

    return (
        <div className="m-form -login">
            <div className="m-form__title">
                <span>Sign in with Email</span>
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
                        <InputField
                            name="password"
                            type={INPUT_FILED_TYPE.PASSWORD}
                            label="form.label.password"
                            placeholder="form.label.password"
                            icon="lock"
                            required
                        />
                        <Button
                            buttonClass={BUTTON_STATUS.PRIMARY}
                            type={BUTTON_TYPE.SUBMIT}
                            label="button.logIn"
                        />
                    </Form>
                )}
            </Formik>
            <Link to={ROUTES.FORGOT_PASSWORD}>{t('links.forgotPassword')}</Link>
            <span className="m-form__link">
                {t('links.dontHave')}{' '}
                <Link to={ROUTES.REGISTER}>{t('links.register')}</Link>
            </span>
        </div>
    )
}

export default Login
