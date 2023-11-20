import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { Languages } from '@store/types'
import {
    AddSvg,
    BackLeftSvg,
    BackRightSvg,
    ConfirmSvg,
} from '@store/ui-core/assets'
import { Button, NavbarButtonSetting } from '@store/ui-core/components'
import {
    currentPageAtom,
    navbarButtonPathAtom,
    sidebarAtom,
} from '@store/ui-core/recoil'

export const Navbar = () => {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()
    const separator = '|'

    const openSidebar = useRecoilValue(sidebarAtom)
    const { mainTitle, subTitle, recordTitle } = useRecoilValue(currentPageAtom)
    const {
        path,
        title,
        buttonFunction,
        isLoading: loading,
    } = useRecoilValue(navbarButtonPathAtom)

    const navigateTo = () => {
        if (path) navigate(path)
    }

    return (
        <div
            className={classNames(
                'bg-secondary-200 dark:bg-secondary-800 fixed top-0 z-10 flex items-center justify-between bg-opacity-95 px-3 py-3 duration-500 dark:bg-opacity-95',
                // i18n.language === Languages.AR
                // 	? "rounded-bl-xl left-0"
                // 	: "rounded-br-xl right-0",
                openSidebar ? 'navbar-case-1' : 'navbar-case-2',
            )}
        >
            <div className="text-primary-500 select-none text-xl font-bold dark:text-white lg:text-3xl">
                <span
                    onClick={() => {
                        if (subTitle || recordTitle)
                            navigate(
                                t(mainTitle, { lng: Languages.EN }).replace(
                                    ' ',
                                    '-',
                                ),
                            )
                    }}
                    className={classNames(
                        subTitle ? 'cursor-pointer' : 'text-4xl',
                    )}
                >
                    {t(mainTitle)}
                </span>
                <span className="">
                    {subTitle ? ` ${separator} ${t(subTitle)}` : ''}
                </span>
                <span className="lg:text-2xl">
                    {recordTitle ? (
                        <>
                            <span className="text-3xl"> {separator}</span>{' '}
                            {recordTitle}
                        </>
                    ) : (
                        ''
                    )}
                </span>
            </div>

            <Button
                title={title as any}
                color={
                    title === NavbarButtonSetting.CONFIRM
                        ? 'success'
                        : title === NavbarButtonSetting.BACK
                        ? 'secondary'
                        : 'secondary'
                }
                onClick={buttonFunction ?? navigateTo}
                disabled={!path || loading ? true : false}
                loading={loading}
                childPosition={
                    i18n.language === Languages.AR ? 'right' : 'left'
                }
            >
                {title === NavbarButtonSetting.CONFIRM ? (
                    <ConfirmSvg
                        className={classNames(
                            'h-7 w-fit fill-white',
                            !path && '!fill-secondary-500',
                        )}
                    />
                ) : title === NavbarButtonSetting.BACK ? (
                    i18n.language === Languages.AR ? (
                        <BackRightSvg
                            className={classNames(
                                'h-7 w-fit fill-white',
                                !path && '!fill-secondary-500',
                            )}
                        />
                    ) : (
                        <BackLeftSvg
                            className={classNames(
                                'h-7 w-fit fill-white',
                                !path && '!fill-secondary-500',
                            )}
                        />
                    )
                ) : (
                    <AddSvg
                        className={classNames(
                            'h-7 w-fit fill-white',
                            !path && '!fill-secondary-500',
                        )}
                    />
                )}
            </Button>
        </div>
    )
}
