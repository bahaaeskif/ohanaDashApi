import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { Dir, Languages, Static } from '@store/types'

import { languageAtom } from '../services/recoil'

export const useLanguage = () => {
    const { i18n } = useTranslation()
    const [currentLanguage, setCurrentLanguage] = useRecoilState(languageAtom)

    const setDirection = () => {
        document.documentElement.dir = i18n.dir()
        localStorage.setItem(Static.DIR, i18n.dir())
    }

    const setFontFamily = (fontFamily?: string) => {
        if (fontFamily) document.documentElement.style.fontFamily = fontFamily
        else {
            if (i18n.language === Languages.AR)
                document.documentElement.style.fontFamily = 'sky'
            else document.documentElement.style.fontFamily = 'poppins'
        }
    }

    const setDateLocal = (locale?: string) => {
        if (locale) moment.locale(locale)
        else {
            if (localStorage.getItem(Static.I18N_LNG) === Languages.AR)
                moment.locale(Languages.AR)
            else moment.locale(Languages.EN)
        }
    }

    const setLanguage = (language?: Languages) => {
        i18n.changeLanguage(
            language
                ? language
                : i18n.language === Languages.AR
                ? Languages.EN
                : Languages.AR,
        )
        setCurrentLanguage(i18n.language as Languages)
        initLanguage()
    }

    const initLanguage = () => {
        setDirection()
        setFontFamily()
        setDateLocal()
    }

    return {
        setDirection,
        setFontFamily,
        currentLanguage,
        setLanguage,
        initLanguage,
    }
}
