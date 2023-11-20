import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { IEmployee, PageRoute, Translations } from '@store/types'
import {
    Divider,
    NavbarButtonSetting,
    ShowMoreCard,
    Text,
} from '@store/ui-core/components'
import { navbarButtonPathAtom } from '@store/ui-core/recoil'
import { join } from '@store/utils/ui'

export const ShowMoreEmployee = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const { pathname, state } = useLocation()
    const setNavbarButtonPath = useSetRecoilState(navbarButtonPathAtom)

    const employee = state?.employee as IEmployee

    useEffect(() => {
        const paths = pathname.split('/')
        setNavbarButtonPath({
            path: join(paths[1], paths[2]),
            title: NavbarButtonSetting.BACK,
            isLoading: false,
        })
    }, [])

    if (!employee) navigate(join(PageRoute.NOT_FOUND))

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
                <div className="flex flex-wrap ">
                    <ShowMoreCard
                        title={Translations.KEY.FIRST_NAME}
                        detail={employee.firstName}
                    />
                    <ShowMoreCard
                        title={Translations.KEY.LAST_NAME}
                        detail={employee.lastName}
                    />
                </div>

                <Divider margin="mt-10" />

                <Text
                    text={Translations.COMMON.WORK_INFORMATION}
                    size="text-3xl"
                    margin="m-3"
                    color="text-secondary-500"
                    withTranslation
                />
                <div className="flex flex-wrap">
                    <ShowMoreCard
                        title={Translations.KEY.USERNAME}
                        detail={employee.username}
                    />
                    <ShowMoreCard
                        title={Translations.KEY.ROLE}
                        detail={employee.role}
                    />
                </div>
            </div>
        </>
    )
}
