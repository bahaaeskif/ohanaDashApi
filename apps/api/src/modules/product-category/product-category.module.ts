import { Module } from '@nestjs/common'

import { AssetModule } from '../asset'
import {
    DashboardProductCategoryController,
    StoreProductCategoryController,
} from './controllers'
import { ProductCategoryService } from './product-category.service'

@Module({
    imports: [AssetModule],
    providers: [ProductCategoryService],
    controllers: [
        DashboardProductCategoryController,
        StoreProductCategoryController,
    ],
    exports: [ProductCategoryService],
})
export class ProductCategoryModule {}
