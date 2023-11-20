import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { priceUnit } from '@store/constant'
import { IProduct, Languages, PageRoute, Translations } from '@store/types'
import {
    NavbarButtonSetting,
    ShowMoreCard,
    Text,
} from '@store/ui-core/components'
import { navbarButtonPathAtom } from '@store/ui-core/recoil'
import { TimeUtils } from '@store/utils'
import { join } from '@store/utils/ui'

export const ShowMoreProduct = () => {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()
    const { pathname, state } = useLocation()

    const setNavbarButtonPath = useSetRecoilState(navbarButtonPathAtom)

    const product = state?.product as IProduct

    useEffect(() => {
        const paths = pathname.split('/')
        setNavbarButtonPath({
            path: join(paths[1], paths[2]),
            title: NavbarButtonSetting.BACK,
            isLoading: false,
        })
    }, [])

    if (!product) navigate(join(PageRoute.NOT_FOUND))

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
                <div className="flex flex-wrap">
                    <ShowMoreCard
                        title={Translations.KEY.NAME}
                        detail={product.name}
                    />
                    <ShowMoreCard
                        title={Translations.KEY.PRICE}
                        detail={`${product.price.toString()} ${
                            i18n.language === Languages.AR
                                ? priceUnit.ar
                                : priceUnit.en
                        }`}
                    />
                    <ShowMoreCard
                        title={Translations.KEY.CATEGORY}
                        detail={product.productCategory.name}
                    />
                    <ShowMoreCard
                        title={Translations.KEY.CREATED_AT}
                        detail={TimeUtils.DateFormat({
                            date: product.createdAt,
                        })}
                    />
                </div>
            </div>
        </>
    )
}
