import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { Translations } from '@store/types'
import { LogoutSvg } from '@store/ui-core/assets'
import {
    Button,
    LanguageSwitcher,
    ThemeSwitcher,
} from '@store/ui-core/components'
import { useAuth } from '@store/ui-core/hooks'
import { currentPageAtom, sidebarAtom } from '@store/ui-core/recoil'

import { PagesRoutes } from '../../routes'
import { Hamburger } from './hamburger'

export const Sidebar = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [openSidebar, setOpenSidebar] = useRecoilState(sidebarAtom)
    const [{ id: pageId }, setCurrentPage] = useRecoilState(currentPageAtom)

    const sidebarNavigate = ({
        id,
        path,
        pageTitle,
    }: {
        id: number
        path: string
        pageTitle: string
    }) => {
        setCurrentPage({
            id: id,
            mainTitle: pageTitle,
            subTitle: '',
            recordTitle: '',
        })
        navigate(path)
    }

    return (
        <div
            className={classNames(
                openSidebar ? 'w-72' : 'w-20',
                // i18n.language === Languages.EN
                // 	? "rounded-br-xl shadow-right"
                // 	: "rounded-bl-xl shadow-left",
                'bg-secondary-200 dark:bg-secondary-800 z-50 flex flex-col bg-opacity-95 p-3 !duration-500 dark:bg-opacity-95',
            )}
        >
            <Hamburger open={openSidebar} setOpen={setOpenSidebar} />
            <ul className={classNames('flex-1', openSidebar ? 'mt-4' : 'mt-3')}>
                {PagesRoutes.map(({ id, path, icon, title, display }) =>
                    display ? (
                        <li
                            key={id}
                            className={classNames(
                                id === pageId
                                    ? '!bg-primary-500 hover:!bg-primary-500 !text-white'
                                    : 'text-secondary-500 dark:text-white',
                                openSidebar ? '' : 'mx-auto w-fit',
                                'active:bg-secondary-200 group my-2 flex cursor-pointer items-center gap-x-5 rounded-md p-2 text-center text-lg !duration-100 hover:bg-white',
                            )}
                            onClick={() => {
                                sidebarNavigate({
                                    id: id,
                                    path: path,
                                    pageTitle: title,
                                })
                                // setOpenSidebar(false)
                            }}
                        >
                            <div>
                                {icon({
                                    className: classNames(
                                        id === pageId
                                            ? 'fill-white'
                                            : 'fill-secondary-500 dark:fill-secondary-300',
                                        'w-8 h-fit !duration-100',
                                    ),
                                })}
                            </div>
                            <span
                                className={classNames(
                                    !openSidebar && 'hidden',
                                    'dark:group-hover:text-secondary-300 origin-left',
                                )}
                            >
                                {t(title)}
                            </span>
                        </li>
                    ) : null,
                )}
            </ul>

            <div>
                <LanguageSwitcher className="my-2 mx-auto" />
                <ThemeSwitcher className="my-2 mx-auto" />
                <Button
                    fullWidth
                    title={openSidebar ? Translations.AUTH.LOGOUT : ''}
                    onClick={logout}
                >
                    <LogoutSvg className={classNames('h-fit w-8 fill-white')} />
                </Button>
            </div>
        </div>
    )
}
