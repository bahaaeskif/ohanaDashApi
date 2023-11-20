import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
// import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md'

import { Themes, Translations } from '@store/types'

import { useTheme } from '../../../hooks'
import { ButtonProps } from '../../types'
import { Button } from '../button'

export function ThemeSwitcher({ className, outline, color }: ButtonProps) {
    const { theme, toggle } = useTheme()
    const { t } = useTranslation()

    return (
        <Button
            color={color}
            outline={outline}
            className={classNames(className, 'base-switcher')}
            onClick={toggle}
        >
            <p className="text-base">
                {t(
                    theme === Themes.LIGHT
                        ? Translations.KEY.DARK
                        : Translations.KEY.LIGHT,
                )}
            </p>
        </Button>
    )
}
