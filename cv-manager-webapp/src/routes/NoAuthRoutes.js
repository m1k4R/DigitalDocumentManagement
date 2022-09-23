import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import loadable from 'utils/loadable'

import ROUTES from 'constants/routes'

import NoAuthLayout from 'components/NoAuthLayout'

const Login = loadable(() => import('screens/noAuth/Login'))
const Register = loadable(() => import('screens/noAuth/Register'))
const ForgotPassword = loadable(() => import('screens/noAuth/ForgotPassword'))
const ResetPassword = loadable(() => import('screens/noAuth/ResetPassword'))

const NoAuthRoutes = () => {
    return (
        <NoAuthLayout>
            <Routes>
                <Route path={ROUTES.LOGIN} element={<Login />} exact />
                <Route path={ROUTES.REGISTER} element={<Register />} exact />
                <Route
                    path={ROUTES.FORGOT_PASSWORD}
                    element={<ForgotPassword />}
                    exact
                />
                <Route
                    path={`${ROUTES.RESET_PASSWORD}/:token`}
                    element={<ResetPassword />}
                    exact
                />
                <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
            </Routes>
        </NoAuthLayout>
    )
}

export default NoAuthRoutes
