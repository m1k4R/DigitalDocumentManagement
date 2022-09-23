import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import loadable from 'utils/loadable'

import ROUTES from 'constants/routes'

import Layout from 'components/Layout'

const Home = loadable(() => import('screens/Home'))
const FormTemplate = loadable(() => import('screens/templates/FormTemplate'))
const TableTemplate = loadable(() => import('screens/templates/TableTemplate'))

const AuthRoutes = () => {
    return (
        <Layout>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home />} exact />
                <Route
                    path={ROUTES.TEMPLATE_FORM}
                    element={<FormTemplate />}
                    exact
                />
                <Route
                    path={ROUTES.TEMPLATE_TABLE}
                    element={<TableTemplate />}
                    exact
                />
                <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
            </Routes>
        </Layout>
    )
}

export default AuthRoutes
