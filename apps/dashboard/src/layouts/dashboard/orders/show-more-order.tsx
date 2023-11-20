import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { IOrder, PageRoute, Translations } from '@store/types'
import { NavbarButtonSetting, Text } from '@store/ui-core/components'
import { navbarButtonPathAtom } from '@store/ui-core/recoil'
import { join } from '@store/utils/ui'

export const ShowMoreOrder = () => {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()
    const { pathname, state } = useLocation()

    const setNavbarButtonPath = useSetRecoilState(navbarButtonPathAtom)

    const order = state?.order as IOrder

    useEffect(() => {
        const paths = pathname.split('/')
        setNavbarButtonPath({
            path: join(paths[1], paths[2]),
            title: NavbarButtonSetting.BACK,
            isLoading: false,
        })
    }, [])

    if (!order) navigate(join(PageRoute.NOT_FOUND))

    return (
        <>
            <title>{t(Translations.KEY.SHOW)}</title>
            <div className="show-more-container">
                <Text
                    text={Translations.COMMON.INFORMATION}
                    size="text-3xl"
                    margin="m-3"
                    color="text-secondary-500"
                    withTranslation
                />
                <div className="flex flex-wrap"></div>
            </div>
        </>
    )
}
