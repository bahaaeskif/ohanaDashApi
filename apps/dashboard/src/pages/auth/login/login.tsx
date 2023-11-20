import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { Translations } from '@store/types'
import { LanguageSwitcher, ThemeSwitcher } from '@store/ui-core/components'
import { accessTokenAtom } from '@store/ui-core/recoil'

import { LoginForm } from '../../../layouts'
import { Logged } from './logged'

export const Login = () => {
    const { t } = useTranslation()

    const token = useRecoilValue(accessTokenAtom)

    if (token) return <Logged />
    return (
        <>
            <title>{t(Translations.PAGES.LOGIN)}</title>
            <div className="absolute top-0 right-0 mx-5">
                <LanguageSwitcher className="my-5" />
                <ThemeSwitcher className="my-5" />
            </div>
            <div className="flex">
                {/* <DoctorInfo /> */}
                <LoginForm />
            </div>
        </>
    )
}
