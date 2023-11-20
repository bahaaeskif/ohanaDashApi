import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes } from 'react-router-dom'

import { PageRoute, Translations } from '@store/types'
import { join } from '@store/utils/ui'

import {
    AddEmployee,
    EditEmployee,
    EditPassword,
    MainEmployee,
    ShowMoreEmployee,
} from '../../../layouts'

export const Employees = () => {
    const { t } = useTranslation()

    return (
        <>
            <title>{t(Translations.PAGES.EMPLOYEES)}</title>
            <Routes>
                <Route path="/" element={<MainEmployee />} />
                <Route path={join(PageRoute.ADD)} element={<AddEmployee />} />
                <Route
                    path={join(PageRoute.EDIT_PASSWORD, ':employeUsername')}
                    element={<EditPassword />}
                />
                <Route
                    path={join(PageRoute.EDIT, ':employeUsername')}
                    element={<EditEmployee />}
                />
                <Route
                    path={join(PageRoute.SHOW, ':employeUsername')}
                    element={<ShowMoreEmployee />}
                />
                <Route
                    path="*"
                    element={<Navigate to={join(PageRoute.NOT_FOUND)} />}
                />
            </Routes>
        </>
    )
}
