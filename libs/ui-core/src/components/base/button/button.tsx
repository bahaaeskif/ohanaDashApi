import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { Languages } from '@store/types'
import { LoaderSvg } from '@store/ui-core/assets'

import { ButtonProps } from '../../types'

export const Button = ({
    title = '',
    icon = '',
    fullWidth = false,
    outline = false,
    color = 'primary',
    className = '',
    disabled = false,
    loading = false,
    childPosition = 'left',
    children,
    onClick,
}: ButtonProps) => {
    const { t, i18n } = useTranslation()

    return (
        <div
            className={classNames(
                'group',
                className,
                fullWidth ? 'w-full' : 'md:w-fit',
            )}
        >
            <button
                disabled={disabled}
                onClick={!loading ? onClick : null}
                className={classNames(
                    'base-button disabled:!bg-secondary-300 disabled:!text-secondary-500',
                    icon ?? 'flex items-center justify-center gap-2',
                    outline ? 'outline' : 'text-white outline-none',
                    outline
                        ? color === 'error'
                            ? `text-error-500 outline-error-500 ${
                                  !loading ? 'hover:outline-error-600' : ''
                              }`
                            : color === 'warning'
                            ? `text-warning-500 outline-warning-500 ${
                                  !loading ? 'hover:outline-warning-600' : ''
                              }`
                            : color === 'success'
                            ? `text-success-500 outline-success-500 ${
                                  !loading ? 'hover:outline-success-600' : ''
                              }`
                            : color === 'secondary'
                            ? `text-secondary-500 outline-secondary-500 ${
                                  !loading ? 'hover:outline-secondary-600' : ''
                              }`
                            : `text-primary-500 outline-primary-500 ${
                                  !loading ? 'hover:outline-primary-600' : ''
                              }`
                        : color === 'error'
                        ? `bg-error-500 ${!loading ? 'hover:bg-error-600' : ''}`
                        : color === 'warning'
                        ? `bg-warning-500 ${
                              !loading ? 'hover:bg-warning-600' : ''
                          }`
                        : color === 'success'
                        ? `bg-success-500 ${
                              !loading ? 'hover:bg-success-600' : ''
                          }`
                        : color === 'secondary'
                        ? `bg-secondary-500 ${
                              !loading ? 'hover:bg-secondary-600' : ''
                          }`
                        : `bg-primary-500 ${
                              !loading ? 'hover:bg-primary-600' : ''
                          }`,
                )}
            >
                {loading ? (
                    <div className="mx-auto w-min">
                        <LoaderSvg />
                    </div>
                ) : (
                    <>
                        {icon && (
                            <img
                                alt=""
                                src={icon}
                                className={classNames('w-10')}
                            />
                        )}
                        <div
                            className={classNames(
                                i18n.language === Languages.AR
                                    ? 'flex-row-reverse'
                                    : '',
                                title && children ? 'gap-x-1' : '',
                                'flex items-center justify-center',
                            )}
                        >
                            {childPosition === 'left' && children}
                            {t(title)}
                            {childPosition === 'right' && children}
                        </div>
                    </>
                )}
            </button>
        </div>
    )
}
