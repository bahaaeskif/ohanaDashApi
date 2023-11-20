import { BaseInterface } from '../base'
import { IOrderItem } from './order-item.interface'
import { OrderStatus } from './order-status.enum'

export interface IOrder extends BaseInterface {
    totalPrice: string
    email: string
    phone: string
    firstName: string
    lastName: string
    region: string
    country: string
    address: string
    notes: string
    status: OrderStatus

    orderItems: IOrderItem[]
}
