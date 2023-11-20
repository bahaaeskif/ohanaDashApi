import { toast } from 'react-toastify'

type ToastType = 'info' | 'success' | 'warning' | 'error' | 'default'
export const Toast = (message: string, type: ToastType = 'default') =>
    toast(message, { type })
