import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common'

import { Product } from '@store/api-core/database'

import { ProductService } from '../product.service'

@Controller('store/products')
export class StoreProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getProducts(): Promise<Product[]> {
        return this.productService.getProducts()
    }

    @Get(':productId')
    @HttpCode(HttpStatus.OK)
    getProduct(@Param('productId') productId: string): Promise<Product> {
        return this.productService.getProductById(productId)
    }
}
