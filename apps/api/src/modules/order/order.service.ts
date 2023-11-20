import { BadRequestException, Injectable } from '@nestjs/common'
import { EntityManager, FindOneOptions, In } from 'typeorm'

import { Order, OrderItem } from '@store/api-core/database'
import { TransactionBaseService } from '@store/api-core/service'
import {
    CreateOrderDto,
    UpdateOrderDto,
    UpdateOrderStatusDto,
} from '@store/dto'
import { HttpException, OrderStatus, Property } from '@store/types'

import { ProductService } from '../product'

@Injectable()
export class OrderService extends TransactionBaseService {
    constructor(
        private entityManager: EntityManager,
        private readonly productService: ProductService,
    ) {
        super(entityManager)
    }

    get orderRepository() {
        const manager = this.transactionManager_ ?? this.entityManager
        return manager.getRepository(Order)
    }

    get orderItemRepository() {
        const manager = this.transactionManager_ ?? this.entityManager
        return manager.getRepository(OrderItem)
    }

    async getOrders(): Promise<Order[]> {
        const orders = await this.orderRepository.find({
            withDeleted: true,
            relations: ['orderItems'],
        })
        return orders
    }

    async getOrderById(
        orderId: string,
        throwError = false,
        options?: FindOneOptions<Order>,
    ): Promise<Order> {
        const order = await this.orderRepository.findOne({
            ...options,
            where: { id: orderId },
            relations: ['orderItems'],
        })
        if (!order && throwError)
            throw new BadRequestException(
                HttpException.NOT_FOUND,
                Property.ORDER,
            )
        return order
    }

    async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        const { productsIds, ...rest } = createOrderDto
        const products = await this.productService.productRepository.find({
            where: { id: In(productsIds) },
            relations: ['productCategory', 'productCategory.asset', 'assets'],
        })
        if (!products.length)
            throw new BadRequestException('Error In Order Items')
        const orderItems = this.orderItemRepository.create(
            products.map((product) => ({ product })),
        )
        rest.totalPrice = products.reduce(
            (prev, current) => +prev + +current.price,
            0,
        )
        let order = this.orderRepository.create({
            ...rest,
            orderItems,
        })
        order = await this.orderRepository.save(order)
        return order
    }

    async updateOrder(
        orderId: string,
        updateOrderDto: UpdateOrderDto,
    ): Promise<Order> {
        return
    }

    async updateStatus(orderId: string, updateStatusDto: UpdateOrderStatusDto) {
        await this.orderRepository.update(
            { id: orderId },
            { ...updateStatusDto },
        )
        return { message: HttpException.SUCCESSFUL }
    }

    async deleteOrder(orderId: string): Promise<void> {
        await this.orderRepository.update(
            { id: orderId },
            { status: OrderStatus.CANCELED },
        )
        await this.orderRepository.softDelete(orderId)
    }

    async restoreOrder(orderId: string): Promise<void> {
        await this.orderRepository.restore(orderId)
    }
}
