import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes } from 'react-router-dom'

import { PageRoute, Translations } from '@store/types'
import { join } from '@store/utils/ui'

import {
    AddProductCategory,
    EditProductCategory,
    MainProductCategory,
    ShowMoreProductCategory,
} from '../../../layouts'

export const ProductsCategories = () => {
    const { t } = useTranslation()

    return (
        <>
            <title>{t(Translations.PAGES.PRODUCTS_CATEGORIES)}</title>
            <Routes>
                <Route path="/" element={<MainProductCategory />} />
                <Route
                    path={join(PageRoute.ADD)}
                    element={<AddProductCategory />}
                />
                <Route
                    path={join(PageRoute.EDIT, ':patientFullname')}
                    element={<EditProductCategory />}
                />
                <Route
                    path={join(PageRoute.SHOW, ':patientFullname')}
                    element={<ShowMoreProductCategory />}
                />
                <Route
                    path="*"
                    element={<Navigate to={join(PageRoute.NOT_FOUND)} />}
                />
            </Routes>
        </>
    )
}
