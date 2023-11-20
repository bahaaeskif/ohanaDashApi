import { OrderStatus } from '@store/types'

export type ModalProps = {
    isOpen: boolean
    toggle: (status?: boolean) => void
    // modalStatus: boolean;
    // setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
    // modalId: string;
    // modalOverlayId: string;
}

export type SuccessModalProps = ModalProps & {
    closeFunction: any
    message?: string
}

export type MessageModalProps = ModalProps & {
    closeFunction: any
    message?: string
}

export type DeleteModalProps = ModalProps & {
    closeFunction: () => void
    deleteFunction: () => void
}

export type RestoreModalProps = ModalProps & {
    closeFunction: () => void
    restoreFunction: () => void
}

export type OrderStatusModalProps = ModalProps & {
    prevStatus: OrderStatus
    closeFunction: () => void
    orderStatusFunction: (orderStatus: OrderStatus) => void
}
