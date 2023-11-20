import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes } from 'react-router-dom'

import { PageRoute, Translations } from '@store/types'
import { join } from '@store/utils/ui'

import { MainOrder, ShowMoreOrder } from '../../../layouts'

export const Orders = () => {
    const { t } = useTranslation()

    return (
        <>
            <title>{t(Translations.PAGES.ORDERS)}</title>
            <Routes>
                <Route path="/" element={<MainOrder />} />
                <Route
                    path={join(PageRoute.SHOW, ':order')}
                    element={<ShowMoreOrder />}
                />
                <Route
                    path="*"
                    element={<Navigate to={join(PageRoute.NOT_FOUND)} />}
                />
            </Routes>
        </>
    )
}
