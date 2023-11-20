import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'

import { IErrors } from '@store/types'

export type InputProps = {
    id: string
    type?: HTMLInputTypeAttribute
    placeholder?: string
    label?: string
    fullWidth?: boolean
    outline?: boolean
    className?: string
    value?: any
    errors?: IErrors
    onChange: ChangeEventHandler<HTMLInputElement>
    onEnterPress?: () => void
}
