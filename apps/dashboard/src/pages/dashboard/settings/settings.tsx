import { Navigate, Route, Routes } from 'react-router-dom'

import { PageRoute } from '@store/types'
import { join } from '@store/utils/ui'

import { MainSettings } from '../../../layouts'

export function Settings() {
    return (
        <Routes>
            <Route path="/" element={<MainSettings />} />
            <Route
                path="*"
                element={<Navigate to={join(PageRoute.NOT_FOUND)} />}
            />
        </Routes>
    )
}
