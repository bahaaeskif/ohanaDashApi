import { PageRoute, Translations } from '@store/types'
import {
    CategoriesSvg,
    OrdersSvg,
    PersonsSvg,
    ProductsSvg,
    SettingsSvg,
} from '@store/ui-core/assets'

export const PagesRoutes = [
    {
        id: 1,
        path: PageRoute.EMPLOYEES,
        title: Translations.PAGES.EMPLOYEES,
        icon: PersonsSvg,
        display: +process.env.VITE_EMPLOYEES!,
    },
    {
        id: 2,
        path: PageRoute.PRODUCTS,
        title: Translations.PAGES.PRODUCTS,
        icon: ProductsSvg,
        display: +process.env.VITE_PRODUCTS!,
    },
    {
        id: 3,
        path: PageRoute.PRODUCTS_CATEGORIES,
        title: Translations.PAGES.PRODUCTS_CATEGORIES,
        icon: CategoriesSvg,
        display: +process.env.VITE_PRODUCTS_CATEGORIES!,
    },
    {
        id: 4,
        path: PageRoute.ORDERS,
        title: Translations.PAGES.ORDERS,
        icon: OrdersSvg,
        display: +process.env.VITE_ORDERS!,
    },
    // {
    //     id: 5,
    //     path: PageRoute.SETTINGS,
    //     title: Translations.PAGES.SETTINGS,
    //     icon: SettingsSvg,
    //     display: +process.env.VITE_SETTINGS!,
    // },
]
