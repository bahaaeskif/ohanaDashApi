import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { Languages } from '@store/types'
import { HamburgerProps } from '@store/ui-core/components'

export const Hamburger = ({ open, setOpen }: HamburgerProps) => {
    const { i18n } = useTranslation()
    return (
        <div
            className={classNames(
                'cursor-pointer',
                open
                    ? classNames(
                          'relative my-5 w-fit',
                          i18n.language === Languages.AR
                              ? 'mr-auto'
                              : 'ml-auto',
                      )
                    : 'mx-auto my-2',
            )}
            onClick={() => setOpen(!open)}
        >
            <div
                className={classNames(
                    'bg-primary-500 h-[4px] w-8 transform rounded-md transition-all duration-500 dark:bg-white',
                    open ? 'absolute top-1/2 bottom-1/2 -rotate-45' : 'mb-2',
                )}
            ></div>
            <div
                className={classNames(
                    'bg-primary-500 h-[4px] w-8 transform rounded-md transition-all duration-500 dark:bg-white',
                    open ? 'h-[30px] opacity-0' : '',
                )}
            ></div>
            <div
                className={classNames(
                    'bg-primary-500 h-[4px] w-8 transform rounded-md transition-all duration-500 dark:bg-white',
                    open ? 'absolute top-1/2 bottom-1/2 rotate-45' : 'mt-2',
                )}
            ></div>
        </div>
    )
}
