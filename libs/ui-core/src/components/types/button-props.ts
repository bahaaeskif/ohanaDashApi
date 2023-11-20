import { ColorsType } from './style'

export type ButtonProps = {
    title?: string
    icon?: string
    fullWidth?: boolean
    outline?: boolean
    color?: ColorsType
    className?: string
    disabled?: boolean
    loading?: boolean
    childPosition?: 'right' | 'left'
    onClick?: () => void
    children?: JSX.Element
}
