import { useState } from 'react'

export const useModal = <T>(defaultState?: T) => {
    const [isOpen, setIsOpen] = useState(false)
    const [state, setState] = useState<T>(defaultState)

    const toggle = (status?: boolean) => {
        setIsOpen(status ? status : !isOpen)
    }

    return {
        isOpen,
        toggle,
        state,
        setState,
    }
}
