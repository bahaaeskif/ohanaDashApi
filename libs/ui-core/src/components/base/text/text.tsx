import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { TextProps } from '../../types'

export const Text = ({
    text,
    size,
    color = 'text-black',
    darkColor = 'dark:text-white',
    fontFamily,
    weight,
    margin,
    padding,
    className = '',
    withTranslation = false,
}: TextProps) => {
    const { t } = useTranslation()
    return (
        <div
            className={classNames(
                className,
                size,
                color,
                darkColor,
                fontFamily,
                weight,
                margin,
                padding,
            )}
        >
            {withTranslation ? t(text) : text}
        </div>
    )
}
