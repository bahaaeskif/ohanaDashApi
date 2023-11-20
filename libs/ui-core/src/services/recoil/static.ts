import { atom } from 'recoil'

import { ICustomer, IEmployee, Languages, Static, Themes } from '@store/types'

import { NavbarButtonSetting } from '../../components'

const apiRoot = process.env.API_ROOT
const apiUrl = process.env.API_URL

export const apiRootAtom = atom<string>({
    key: Static.ROOT_API,
    default: apiRoot,
})

export const apiUrlAtom = atom<string>({
    key: Static.ROOT_URL,
    default: apiUrl,
})

export const themeAtom = atom<Themes>({
    key: Static.THEME,
    default: (localStorage.getItem(Static.THEME) as Themes) ?? Themes.LIGHT,
})

export const languageAtom = atom<Languages>({
    key: Static.I18N_LNG,
    default:
        (localStorage.getItem(Static.I18N_LNG) as Languages) ?? Languages.EN,
})

export const accessTokenAtom = atom<string | null>({
    key: Static.ACCESS_TOKEN,
    default: localStorage.getItem(Static.ACCESS_TOKEN),
})

export const refreshTokenAtom = atom<string | null>({
    key: Static.REFRESH_TOKEN,
    default: localStorage.getItem(Static.REFRESH_TOKEN),
})

export const currentUserAtom = atom<IEmployee | ICustomer>({
    key: Static.CURRENT_USER,
    default: localStorage.getItem(Static.CURRENT_USER)
        ? JSON.parse(localStorage.getItem(Static.CURRENT_USER))
        : null,
})

export const sidebarAtom = atom<boolean>({
    key: Static.SIDEBAR,
    default: false,
})

export const currentPageAtom = atom<{
    id: number
    mainTitle: string
    subTitle: string
    recordTitle: string
}>({
    key: Static.CURRENT_PAGE,
    default: {
        id: 0,
        mainTitle: '',
        subTitle: '',
        recordTitle: '',
    },
})

export const navbarButtonPathAtom = atom<{
    path: string
    title: NavbarButtonSetting
    buttonFunction?: any
    isLoading: boolean
}>({
    key: Static.NAVBAR_BUTTON_PATH,
    default: {
        path: '',
        title: NavbarButtonSetting.ADD,
        isLoading: false,
    },
})
