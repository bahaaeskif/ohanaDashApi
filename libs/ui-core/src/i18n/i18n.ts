import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { Languages, Static } from '@store/types'

import ar from './ar/translation.json'
import en from './en/translation.json'

const localLanguage = localStorage.getItem(Static.I18N_LNG)

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            en: { translation: en },
            ar: { translation: ar },
        },
        fallbackLng: [Languages.AR, Languages.EN],
        lng: localLanguage ? localLanguage : Languages.EN,
    })

export default i18n
