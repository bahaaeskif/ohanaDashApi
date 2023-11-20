import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common'

import { Product } from '@store/api-core/database'
import { RolesGuard } from '@store/api-core/guard'
import { DashboardJwtAccessTokenGuard } from '@store/api-core/passport'
import { CreateProductDto, UpdateProductDto } from '@store/dto'

import { ProductService } from '../product.service'

@Controller('dashboard/products')
@UseGuards(DashboardJwtAccessTokenGuard, RolesGuard)
export class DashboardProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getProducts(): Promise<Product[]> {
        return this.productService.getProducts({ withDeleted: true })
    }

    @Get(':productId')
    @HttpCode(HttpStatus.OK)
    getProduct(@Param('productId') productId: string): Promise<Product> {
        return this.productService.getProductById(productId)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createProduct(
        @Body() createProductDto: CreateProductDto,
    ): Promise<Product> {
        return this.productService.createProduct(createProductDto)
    }

    @Put(':productId')
    @HttpCode(HttpStatus.CREATED)
    updateProduct(
        @Param('productId') productId: string,
        @Body() updateProductDto: UpdateProductDto,
    ): Promise<Product> {
        return this.productService.updateProduct(productId, updateProductDto)
    }

    @Put('restore/:productId')
    @HttpCode(HttpStatus.NO_CONTENT)
    restoreProduct(@Param('productId') productId: string): Promise<void> {
        return this.productService.restoreProduct(productId)
    }

    @Delete(':productId')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteProduct(@Param('productId') productId: string): Promise<void> {
        return this.productService.deleteProduct(productId)
    }
}
