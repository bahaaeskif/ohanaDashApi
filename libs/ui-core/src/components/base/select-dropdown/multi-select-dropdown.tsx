import classNames from 'classnames'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Select from 'react-select'

import { MultiSelectDropdownProps } from '../../types'

export const MultiSelectDropdown = ({
    id,
    label = 'fakeLabel',
    options,
    className = '',
    padding = 'p-3',
    margin = 'm-0',
    width = 'w-full',
    height = 'h-fit',
    textSize = 'text-md',
    textColor = 'text-secondary-500',
    darkTextColor = 'dark:text-black',
    backgroundColor = 'bg-white',
    hoverBackgroundColor = 'hover:bg-secondary-100',
    darkBackgroundColor = 'dark:bg-secondary-300',
    hoverDarkBackgroundColor = 'dark:hover:bg-secondary-400',
    rounded = 'rounded-md',
    fontWeight = 'font-medium',
    value,
    errors,
    onChange,
}: MultiSelectDropdownProps) => {
    const { t } = useTranslation()
    const control = document.getElementsByClassName('css-cq3hou-control')

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
        control[0]?.classList.add(textColor)
        control[0]?.classList.add(darkTextColor)
        control[0]?.classList.add(backgroundColor)
        control[0]?.classList.add(hoverBackgroundColor)
        control[0]?.classList.add(darkBackgroundColor)
        control[0]?.classList.add(hoverDarkBackgroundColor)
    }, [control])

    return (
        <div
            className={classNames(
                className,
                margin,
                width,
                height,
                fontWeight,
                textSize,
            )}
        >
            <label
                className={classNames(
                    'base-label',
                    label === 'fakeLabel' ? 'invisible' : '',
                )}
            >
                {t(label)}
            </label>
            <Select
                id={id}
                className="border-none"
                styles={{
                    control: (base: any, props: any) => ({
                        ...base,
                        padding: '5px',
                        border: 'none',
                        borderRadius: '6px',
                        boxShadow: '0 1px 5px rgb(0 0 0 / 0.2)',
                    }),
                }}
                value={value}
                // inputValue="test"
                onChange={onChange}
                isMulti
                closeMenuOnSelect={false}
                // onInputChange={(e) => console.log(e)}
                // value="test"
                options={options}
            />

            <div className="mt-1 p-1">{showErrors()}</div>
        </div>
    )
}
