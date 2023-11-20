import { Module } from '@nestjs/common'

import { AssetModule } from '../asset'
import { ProductCategoryModule } from '../product-category'
import {
    DashboardProductController,
    StoreProductController,
} from './controllers'
import { ProductService } from './product.service'

@Module({
    imports: [AssetModule, ProductCategoryModule],
    providers: [ProductService],
    controllers: [DashboardProductController, StoreProductController],
    exports: [ProductService],
})
export class ProductModule {}
