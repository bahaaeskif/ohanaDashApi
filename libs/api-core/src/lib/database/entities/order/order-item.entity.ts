import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { Product } from '../product.entity'
import { Order } from './order.entity'

@Entity({ orderBy: { createdAt: 'DESC' } })
export class OrderItem extends BaseEntity {
    @ManyToOne(() => Order, (order) => order.orderItems)
    order: Order
    @Column({ type: 'uuid' })
    orderId: string

    @Column({ type: 'jsonb' })
    product: Product
}
