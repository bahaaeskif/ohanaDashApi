import { Body, Controller, Post } from '@nestjs/common'

import { OrderService } from '../order.service'
import { CreateOrderDto } from '@store/dto'

@Controller('store/orders')
export class StoreOrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.createOrder(createOrderDto)
    }
}
