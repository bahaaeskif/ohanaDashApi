import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { PageRoute, Translations } from '@store/types'

export function Logged() {
    const { t } = useTranslation()

    return (
        <>
            <title>{t(Translations.PAGES.LOGIN)}</title>
            <div
                className="flex h-screen w-screen items-center justify-center bg-cover"
                style={{
                    backgroundImage: `url("/bg.jpg")`,
                }}
            >
                <div className="text-center">
                    <div className="bg-primary-500 cursor-default select-none rounded-md px-10 py-5 shadow-md">
                        <h1 className="text-4xl font-bold text-white">
                            {t(Translations.AUTH.LOGGED_BEFORE)}
                        </h1>
                    </div>
                    <div className="bg-primary-500 hover:bg-primary-600 mt-5 rounded-md text-lg font-medium text-white shadow-md transition-all duration-200">
                        <Link
                            to={`/${PageRoute.DASHBOARD}`}
                            className="block p-3"
                        >
                            {t(Translations.COMMON.RETURN_TO, {
                                destination: Translations.PAGES.DASHBOARD,
                            })}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
