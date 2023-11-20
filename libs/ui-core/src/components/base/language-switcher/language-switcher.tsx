import classNames from 'classnames'

import { Languages } from '@store/types'

import { useLanguage } from '../../../hooks'
import { ButtonProps } from '../../types'
import { Button } from '../button'

export function LanguageSwitcher({ className, outline, color }: ButtonProps) {
    const { currentLanguage, setLanguage } = useLanguage()

    return (
        <Button
            outline={outline}
            color={color}
            className={classNames(className, 'base-switcher')}
            onClick={() => setLanguage()}
        >
            <p
                className={classNames(
                    'text-base',
                    currentLanguage === Languages.EN && 'font-sky',
                )}
            >
                {currentLanguage === Languages.EN
                    ? 'عربي'
                    : Languages.EN.toUpperCase()}
            </p>
        </Button>
    )
}
