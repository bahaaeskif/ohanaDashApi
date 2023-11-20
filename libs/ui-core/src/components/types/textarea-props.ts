import { IErrors } from '@store/types'
import { ChangeEventHandler } from 'react'

export type TextareaProps = {
    id: string
    placeholder?: string
    label?: string
    fullWidth?: boolean
    outline?: boolean
    className?: string
    rows?: number
    value?: any
    errors?: IErrors
    onChange: ChangeEventHandler<HTMLTextAreaElement>
}
