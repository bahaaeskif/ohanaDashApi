import classNames from 'classnames'
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Dir, Languages } from '@store/types'

import { InputProps } from '../../types'

export function Input({
    id,
    type = 'text',
    placeholder = '',
    label = 'fakeLabel',
    fullWidth = false,
    outline = false,
    className,
    value,
    errors,
    onChange,
    onEnterPress,
}: InputProps) {
    const { t, i18n } = useTranslation()
    const [inputDir, setInputDir] = useState(
        i18n.language === Languages.AR ? Dir.RTL : Dir.LTR,
    )
    const [inputValue, setInputValue] = useState('')

    const setDir = (e: ChangeEvent<HTMLInputElement>) => {
        const firstChar = e.target.value.charCodeAt(0)
        if (firstChar >= 1536 && firstChar <= 1791) setInputDir(Dir.RTL)
        else setInputDir(Dir.LTR)
    }

    const twoFunctions = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        setDir(e)
        onChange(e)
    }

    const showErrors = () => {
        const lis = []
        for (const error in errors?.constraints) {
            const text = errors.constraints[error]
            lis.push(
                <li key={lis.length} className="text-error-500">
                    {text}
                </li>,
            )
        }
        return lis
    }

    useEffect(() => {
        if (inputValue === '')
            setInputDir(i18n.language === Languages.AR ? Dir.RTL : Dir.LTR)
    }, [i18n.language, inputValue])

    return (
        <div
            className={classNames(
                className,
                'min-w-[250px]',
                fullWidth ? 'w-full' : 'sm:w-full md:w-fit',
            )}
        >
            <label
                htmlFor={id}
                className={classNames(
                    'base-label',
                    label === 'fakeLabel' ? 'invisible' : '',
                )}
            >
                {t(label)}
            </label>

            <input
                id={id}
                type={type}
                value={value}
                spellCheck={false}
                placeholder={t(placeholder)}
                onKeyDown={(e) =>
                    onEnterPress && e.code === 'Enter' && onEnterPress()
                }
                dir={
                    type === 'password'
                        ? i18n.language === Languages.AR
                            ? Dir.RTL
                            : Dir.LTR
                        : inputDir
                }
                className={classNames(
                    'base-input',
                    outline ? 'base-input-outline' : 'base-input-outline-none',
                )}
                onChange={twoFunctions}
            />

            <div className="mt-1 p-1">{showErrors()}</div>
        </div>
    )
}
