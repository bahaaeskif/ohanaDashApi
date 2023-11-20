import { useState } from 'react'
import { toast } from 'react-toastify'

type toastType = 'info' | 'success' | 'warning' | 'error' | 'default'
export function useToast() {
    const [message, setMessage] = useState('')
    const [type, setType] = useState<toastType>('error')
    const myToast = () => toast(message, { type: type })

    return {
        setMessage,
        setType,
        myToast,
    }
}
