import { Column, Entity, OneToMany } from 'typeorm'

import { IOrderItem, OrderStatus } from '@store/types'

import { BaseEntity } from '../base.entity'
import { OrderItem } from './order-item.entity'

@Entity({ orderBy: { createdAt: 'DESC' } })
export class Order extends BaseEntity {
    @Column({ type: 'numeric', precision: 10, scale: 2 })
    totalPrice: number

    @Column({ length: 255 })
    email: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ length: 255 })
    phone: string

    @Column({ length: 2048 })
    notes: string

    @Column()
    region: string

    @Column()
    address: string

    @Column()
    country: string

    @Column({
        type: 'enum',
        enumName: 'order_status',
        enum: OrderStatus,
        default: OrderStatus.PENDING,
    })
    status: OrderStatus

    @OneToMany(() => OrderItem, (orderItems) => orderItems.order, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    orderItems: OrderItem[]
}
