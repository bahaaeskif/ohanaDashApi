import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes } from 'react-router-dom'

import { PageRoute, Translations } from '@store/types'
import { join } from '@store/utils/ui'

import {
    AddProduct,
    EditProduct,
    MainProduct,
    ShowMoreProduct,
} from '../../../layouts'

export const Products = () => {
    const { t } = useTranslation()

    return (
        <>
            <title>{t(Translations.PAGES.PRODUCTS)}</title>
            <Routes>
                <Route path="/" element={<MainProduct />} />
                <Route path={join(PageRoute.ADD)} element={<AddProduct />} />
                <Route
                    path={join(PageRoute.EDIT, ':salary')}
                    element={<EditProduct />}
                />
                <Route
                    path={join(PageRoute.SHOW, ':salary')}
                    element={<ShowMoreProduct />}
                />
                <Route
                    path="*"
                    element={<Navigate to={join(PageRoute.NOT_FOUND)} />}
                />
            </Routes>
        </>
    )
}
