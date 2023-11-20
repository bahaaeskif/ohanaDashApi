import { Injectable } from '@nestjs/common'

import { ProductCategoryService } from '../product-category'

@Injectable()
export class HomeService {
    constructor(
        private readonly productCategoryService: ProductCategoryService,
    ) {}

    async home() {
        const productsCategoriesWithProducts =
            await this.productCategoryService.getProductsCategories()

        return {
            productsCategoriesWithProducts,
        }
    }
}
