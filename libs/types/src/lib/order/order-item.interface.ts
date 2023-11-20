import { BaseInterface } from '../base'
import { IProduct } from '../product'
import { IOrder } from './order.interface'

export interface IOrderItem extends BaseInterface {
    product: IProduct
    order: IOrder
    orderId: string
}
