import { Navigate, Route, Routes } from 'react-router-dom'

import { PageRoute } from '@store/types'

import { Login } from '../pages'

const Auth = () => {
    return (
        <Routes>
            <Route path={PageRoute.LOGIN} element={<Login />} />
            <Route path="*" element={<Navigate to={PageRoute.LOGIN} />} />
        </Routes>
    )
}

export default Auth
