import classNames from 'classnames'

import { DividerProps } from '../../types'

export const Divider = ({
    color = 'bg-primary-500',
    darkColor = 'dark:bg-secondary-500',
    margin = 'my-5',
    height = 'h-1',
    rounded = 'rounded-md',
    width = 'w-full',
    className = '',
}: DividerProps) => {
    return (
        <div
            className={classNames(
                className,
                width,
                height,
                rounded,
                color,
                darkColor,
                margin,
            )}
        ></div>
    )
}
