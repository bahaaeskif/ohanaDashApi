import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import {
    IProductCategory,
    Languages,
    PageRoute,
    Translations,
} from '@store/types'
import {
    NavbarButtonSetting,
    ShowMoreCard,
    Text,
} from '@store/ui-core/components'
import { navbarButtonPathAtom } from '@store/ui-core/recoil'
import { TimeUtils } from '@store/utils'
import { join } from '@store/utils/ui'

export const ShowMoreProductCategory = () => {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()
    const { pathname, state } = useLocation()
    const setNavbarButtonPath = useSetRecoilState(navbarButtonPathAtom)

    const productCategory = state?.productCategory as IProductCategory

    useEffect(() => {
        const paths = pathname.split('/')
        setNavbarButtonPath({
            path: join(paths[1], paths[2]),
            title: NavbarButtonSetting.BACK,
            isLoading: false,
        })
    }, [])

    if (!productCategory) navigate(join(PageRoute.NOT_FOUND))

    return (
        <>
            <title>{t(Translations.KEY.SHOW)}</title>
            <div className="show-more-container">
                <Text
                    text={Translations.COMMON.PERSONAL_INFORMATION}
                    size="text-3xl"
                    margin="m-3"
                    color="text-secondary-500"
                    withTranslation
                />
                <div className="flex flex-wrap">
                    <ShowMoreCard
                        title={Translations.KEY.NAME_AR}
                        detail={productCategory.name_ar}
                    />
                    <ShowMoreCard
                        title={Translations.KEY.NAME_EN}
                        detail={productCategory.name_en}
                    />
                    <ShowMoreCard
                        title={Translations.KEY.ORDER}
                        detail={productCategory.order.toString()}
                    />
                    <ShowMoreCard
                        title={Translations.KEY.CREATED_AT}
                        detail={TimeUtils.DateFormat({
                            date: productCategory.createdAt,
                            locale: i18n.language as Languages,
                        })}
                    />
                </div>
            </div>
        </>
    )
}
