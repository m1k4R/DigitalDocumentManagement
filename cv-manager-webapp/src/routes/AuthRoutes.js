import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import loadable from 'utils/loadable'

import ROUTES from 'constants/routes'

import Layout from 'components/Layout'

const CVSearch = loadable(() => import('screens/CVSearch'))
const UserApplication = loadable(() => import('screens/UserApplication'))

const AuthRoutes = () => {
    return (
        <Layout>
            <Routes>
                <Route path={ROUTES.HOME} element={<CVSearch />} exact />
                <Route path={ROUTES.USER_APPLICATION} element={<UserApplication />} exact />
                <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
            </Routes>
        </Layout>
    )
}

export default AuthRoutes
