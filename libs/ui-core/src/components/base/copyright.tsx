import classNames from 'classnames'
import { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Languages } from '@store/types'
import { TimeUtils } from '@store/utils'

import {
    DarkTextColor,
    HoverDarkTextColor,
    HoverTextColor,
    TextColor,
} from '../types'

const Copyright = ({
    mainColor = 'text-secondary-400',
    darkMainColor = 'dark:text-gray-400',
    nameColor = 'text-secondary-600',
    hoverNameColor = 'hover:text-secondary-600',
    darkNameColor = 'dark:text-white',
    darkHoverNameColor = 'dark:hover:text-gray-500',
}: {
    mainColor?: TextColor
    darkMainColor?: DarkTextColor
    nameColor?: TextColor
    hoverNameColor?: HoverTextColor
    darkNameColor?: DarkTextColor
    darkHoverNameColor?: HoverDarkTextColor
}) => {
    const { i18n } = useTranslation()

    return (
        <div
            dir="ltr"
            className={classNames(
                'w-full select-none px-1 text-xs',
                i18n.language === Languages.AR ? 'text-left' : 'text-right',
                mainColor,
                darkMainColor,
            )}
        >
            <div>
                <p>
                    {i18n.language === Languages.AR
                        ? 'حقوق النشر'
                        : '© Copyright'}{' '}
                    <a
                        target="_blank"
                        href="http://www.google.com"
                        className={classNames(
                            nameColor,
                            hoverNameColor,
                            darkNameColor,
                            darkHoverNameColor,
                        )}
                        dir={i18n.dir()}
                    >
                        {i18n.language === Languages.AR
                            ? 'Cyber Space'
                            : 'Cyber Space'}
                    </a>{' '}
                    {TimeUtils.DateFormat({
                        format: 'YYYY',
                        locale: i18n.language as Languages,
                    })}
                </p>
            </div>
        </div>
    )
}

export default memo(Copyright)
