import { Module } from '@nestjs/common'

import { ProductModule } from '../product'
import { DashboardOrderController, StoreOrderController } from './controllers'
import { OrderService } from './order.service'

@Module({
    imports: [ProductModule],
    providers: [OrderService],
    controllers: [DashboardOrderController, StoreOrderController],
    exports: [OrderService],
})
export class OrderModule {}
