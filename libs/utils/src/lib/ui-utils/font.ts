import { Languages, Static } from '@store/types'

export const FontFamily = () => {
    if (localStorage.getItem(Static.I18N_LNG) === Languages.AR)
        document.documentElement.style.fontFamily = 'sky'
    else document.documentElement.style.fontFamily = 'poppins'
}
