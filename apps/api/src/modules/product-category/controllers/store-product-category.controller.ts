import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common'

import { ProductCategory } from '@store/api-core/database'

import { ProductCategoryService } from '../product-category.service'

@Controller('store/products-categories')
export class StoreProductCategoryController {
    constructor(
        private readonly productCategoryService: ProductCategoryService,
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getProductsCategories(): Promise<ProductCategory[]> {
        return this.productCategoryService.getProductsCategories()
    }

    @Get(':productCategoryId')
    @HttpCode(HttpStatus.OK)
    getProductCategory(
        @Param('productCategoryId') productCategoryId: string,
    ): Promise<ProductCategory> {
        return this.productCategoryService.getProductCategoryById(
            productCategoryId,
        )
    }
}
