import classNames from 'classnames'
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Dir, Languages } from '@store/types'

import { TextareaProps } from '../../types'

export function Textarea({
    id,
    placeholder = '',
    label = 'fakeLabel',
    fullWidth = false,
    outline = false,
    className,
    rows = 4,
    value,
    errors,
    onChange,
}: TextareaProps) {
    const { t, i18n } = useTranslation()
    const [textareaDir, setTextareaDir] = useState(
        i18n.language === Languages.AR ? Dir.RTL : Dir.LTR,
    )
    const [inputValue, setInputValue] = useState('')

    const setDir = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const firstChar = e.target.value.charCodeAt(0)
        if (firstChar >= 1536 && firstChar <= 1791) setTextareaDir(Dir.RTL)
        else setTextareaDir(Dir.LTR)
    }

    const twoFunctions = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
            setTextareaDir(i18n.language === Languages.AR ? Dir.RTL : Dir.LTR)
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

            <textarea
                id={id}
                spellCheck={false}
                placeholder={t(placeholder)}
                dir={textareaDir}
                rows={rows}
                value={value}
                className={classNames(
                    'base-input resize-none',
                    outline ? 'base-input-outline' : 'base-input-outline-none',
                )}
                onChange={twoFunctions}
            />

            <div className="mt-1 p-1">{showErrors()}</div>
        </div>
    )
}
