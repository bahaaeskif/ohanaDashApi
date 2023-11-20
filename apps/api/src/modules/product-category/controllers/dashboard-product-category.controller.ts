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

import { ProductCategory } from '@store/api-core/database'
import { CreateProductCategoryDto, UpdateProductCategoryDto } from '@store/dto'

import { DashboardJwtAccessTokenGuard } from '@store/api-core/passport'
import { ProductCategoryService } from '../product-category.service'

@Controller('dashboard/products-categories')
@UseGuards(DashboardJwtAccessTokenGuard)
export class DashboardProductCategoryController {
    constructor(
        private readonly productCategoryService: ProductCategoryService,
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getProductsCategories(): Promise<ProductCategory[]> {
        return this.productCategoryService.getProductsCategories()
    }

    @Get('all')
    @HttpCode(HttpStatus.OK)
    getAllProductsCategories(): Promise<ProductCategory[]> {
        return this.productCategoryService.getProductsCategories({
            withDeleted: true,
        })
    }

    @Get(':productCategoryId')
    @HttpCode(HttpStatus.OK)
    getProductCategory(
        @Param('productCategoryId') productCategoryId: string,
    ): Promise<ProductCategory> {
        return this.productCategoryService.getProductCategoryById(
            productCategoryId,
            true,
            { relations: ['products', 'product.asset', 'asset'] },
        )
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createProductCategory(
        @Body() createProductCategoryDto: CreateProductCategoryDto,
    ): Promise<ProductCategory> {
        return this.productCategoryService.createProductCategory(
            createProductCategoryDto,
        )
    }

    @Put(':productCategoryId')
    @HttpCode(HttpStatus.CREATED)
    updateProductCategory(
        @Param('productCategoryId') productCategoryId: string,
        @Body() updateProductCategoryDto: UpdateProductCategoryDto,
    ): Promise<ProductCategory> {
        return this.productCategoryService.updateProductCategory(
            productCategoryId,
            updateProductCategoryDto,
        )
    }

    @Put('restore/:productCategoryId')
    @HttpCode(HttpStatus.NO_CONTENT)
    restoreProductCategory(
        @Param('productCategoryId') productCategoryId: string,
    ): Promise<void> {
        return this.productCategoryService.restoreProductCategory(
            productCategoryId,
        )
    }

    @Delete(':productCategoryId')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteProductCategory(
        @Param('productCategoryId') productCategoryId: string,
    ): Promise<void> {
        return this.productCategoryService.deleteProductCategory(
            productCategoryId,
        )
    }
}
