import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Put,
    UseGuards,
} from '@nestjs/common'

import { Order } from '@store/api-core/database'
import { RolesGuard } from '@store/api-core/guard'
import { DashboardJwtAccessTokenGuard } from '@store/api-core/passport'
import { UpdateOrderStatusDto } from '@store/dto'

import { OrderService } from '../order.service'

@Controller('dashboard/orders')
@UseGuards(DashboardJwtAccessTokenGuard, RolesGuard)
export class DashboardOrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getOrders(): Promise<Order[]> {
        return this.orderService.getOrders()
    }

    @Get(':orderId')
    @HttpCode(HttpStatus.OK)
    getOrder(@Param('orderId') orderId: string): Promise<Order> {
        return this.orderService.getOrderById(orderId)
    }

    @Put('status/:orderId')
    @HttpCode(HttpStatus.OK)
    updateStatus(
        @Param('orderId') orderId: string,
        @Body() updateStatusDto: UpdateOrderStatusDto,
    ) {
        return this.orderService.updateStatus(orderId, updateStatusDto)
    }

    @Delete(':orderId')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteOrder(@Param('orderId') orderId: string): Promise<void> {
        return this.orderService.deleteOrder(orderId)
    }
}
