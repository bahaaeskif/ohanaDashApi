import { BadRequestException, Injectable } from '@nestjs/common'
import { EntityManager, FindManyOptions, FindOneOptions } from 'typeorm'

import { ProductCategory } from '@store/api-core/database'
import { TransactionBaseService } from '@store/api-core/service'
import { CreateProductCategoryDto, UpdateProductCategoryDto } from '@store/dto'
import { HttpException, Property } from '@store/types'

import { AssetService } from '../asset'

@Injectable()
export class ProductCategoryService extends TransactionBaseService {
    constructor(
        private entityManager: EntityManager,
        private assetService: AssetService,
    ) {
        super(entityManager)
    }

    get productCategoryRepository() {
        return this.activeManager_.getRepository(ProductCategory)
    }

    async getProductsCategories(
        options?: FindManyOptions<ProductCategory>,
    ): Promise<ProductCategory[]> {
        const productsCategories = await this.productCategoryRepository.find({
            relations: ['products', 'products.assets', 'asset'],
            ...options,
        })
        return productsCategories
    }

    async getProductCategoryById(
        productCategoryId: string,
        throwError = false,
        options?: FindOneOptions<ProductCategory>,
    ): Promise<ProductCategory> {
        const productCategory = await this.productCategoryRepository.findOne({
            ...options,
            where: { id: productCategoryId },
        })
        if (!productCategory && throwError)
            throw new BadRequestException(
                HttpException.NOT_FOUND,
                Property.CATEGORY,
            )
        return productCategory
    }

    async createProductCategory(
        createProductCategoryDto: CreateProductCategoryDto,
    ): Promise<ProductCategory> {
        const { asset: createAssetDto, ...productCategoryDto } =
            createProductCategoryDto
        return this.atomicPhase_(async (transactionManager) => {
            let newProductCategory =
                this.productCategoryRepository.create(productCategoryDto)
            newProductCategory = await this.productCategoryRepository.save(
                newProductCategory,
            )
            const assetDirectory = `uploads/products-categories/${newProductCategory.id}`
            const newAsset = await this.assetService
                .withTransaction(transactionManager)
                .createAsset(createAssetDto, assetDirectory)
            newProductCategory.asset = newAsset
            newProductCategory = await this.productCategoryRepository.save(
                newProductCategory,
            )
            return newProductCategory
        })
    }

    async updateProductCategory(
        productCategoryId: string,
        updateProductCategoryDto: UpdateProductCategoryDto,
    ): Promise<ProductCategory> {
        const { asset: updateAssetDto, ...productCategoryDto } =
            updateProductCategoryDto
        const productCategory = await this.getProductCategoryById(
            productCategoryId,
            true,
        )
        Object.assign(productCategory, productCategoryDto)
        return this.atomicPhase_(async (transactionManager) => {
            const assetDirectory = `uploads/products-categories/${productCategory.id}`
            // if (updateAssetDto)
            //     await this.assetService
            //         .withTransaction(transactionManager)
            //         .updateAsset(
            //             productCategory.assetId,
            //             updateAssetDto,
            //             assetDirectory,
            //         )
            const updatedProductCategory =
                await this.productCategoryRepository.save(productCategory)
            return updatedProductCategory
        })
    }

    async deleteProductCategory(productCategoryId: string): Promise<void> {
        await this.productCategoryRepository.softDelete(productCategoryId)
    }

    async restoreProductCategory(productCategoryId: string): Promise<void> {
        await this.productCategoryRepository.restore(productCategoryId)
    }
}
