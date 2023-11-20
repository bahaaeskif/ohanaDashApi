import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { PageRoute, Translations } from '@store/types'
import { useAuth } from '@store/ui-core/hooks'

export function NotFound(): JSX.Element {
    const navigate = useNavigate()
    const { t } = useTranslation()

    const { accessToken } = useAuth()
    const [url, setUrl] = useState(`/${PageRoute.AUTH}`)

    const back = () => {
        navigate(-2)
    }

    useEffect(() => {
        setUrl(accessToken ? `/${PageRoute.DASHBOARD}` : `/${PageRoute.AUTH}`)
    }, [])

    return (
        <>
            <title>{t(Translations.PAGES.PAGE_NOT_FOUND)}</title>
            <div
                className="flex h-screen w-screen items-center justify-center bg-cover"
                style={{
                    backgroundImage: "url('/bg.jpg')",
                }}
            >
                <div className="text-center">
                    <div className="bg-primary-500 cursor-default select-none rounded-md px-10 py-5 shadow-md">
                        <h1 className="text-5xl font-bold text-white">
                            {t(Translations.PAGES.PAGE_NOT_FOUND)}
                        </h1>
                        <p className="mt-5 text-5xl font-bold tracking-widest text-white">
                            404
                        </p>
                    </div>
                    <div className="bg-primary-500 hover:bg-primary-600 mt-5 rounded-md text-lg font-medium text-white shadow-md transition-all duration-200">
                        <Link to={url} className="block p-3">
                            {t(Translations.COMMON.RETURN_TO, {
                                destination: accessToken
                                    ? Translations.PAGES.DASHBOARD
                                    : Translations.PAGES.LOGIN,
                            })}
                        </Link>
                    </div>
                    {/* <div
						className="mt-5 bg-primary-500 rounded-md shadow-md hover:bg-primary-600 font-medium text-lg text-white transition-all duration-200"
						onClick={back}
					>
						Back
						<Link to={url} className="block p-3">
							{t(Translations.COMMON.RETURN_TO, {
								destination: token
									? Translations.PAGES.DASHBOARD
									: Translations.PAGES.LOGIN,
							})}
						</Link>
					</div> */}
                </div>
            </div>
        </>
    )
}
