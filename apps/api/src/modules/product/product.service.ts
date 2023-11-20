import { BadRequestException, Injectable } from '@nestjs/common'
import { EntityManager, FindManyOptions, FindOneOptions } from 'typeorm'

import { Product } from '@store/api-core/database'
import { TransactionBaseService } from '@store/api-core/service'
import { CreateProductDto, UpdateProductDto } from '@store/dto'
import { HttpException, Property } from '@store/types'

import { AssetService } from '../asset'
import { ProductCategoryService } from '../product-category'
import { FileUtils } from '@store/utils/api'

@Injectable()
export class ProductService extends TransactionBaseService {
    constructor(
        private entityManager: EntityManager,
        private assetService: AssetService,
        private productCategoryService: ProductCategoryService,
    ) {
        super(entityManager)
    }

    get productRepository() {
        return this.activeManager_.getRepository(Product)
    }

    async getProducts(options?: FindManyOptions<Product>): Promise<Product[]> {
        const products = await this.productRepository.find({
            relations: ['productCategory', 'productCategory.asset', 'assets'],
            ...options,
        })
        return products
    }

    async getProductById(
        productId: string,
        throwError = false,
        options?: FindOneOptions<Product>,
    ): Promise<Product> {
        const product = await this.productRepository.findOne({
            ...options,
            where: { id: productId },
        })
        if (!product && throwError)
            throw new BadRequestException(
                HttpException.NOT_FOUND,
                Property.PRODUCT,
            )
        return product
    }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const { assets: createAssetsDto, ...productDto } = createProductDto
        await this.productCategoryService.getProductCategoryById(
            productDto.productCategoryId,
            true,
        )
        return this.atomicPhase_(async (transactionManager) => {
            let newProduct = this.productRepository.create(productDto)
            newProduct = await this.productRepository.save(newProduct)
            const assetDirectory = `uploads/products/${newProduct.id}`
            const images = await Promise.all(
                createAssetsDto.map(async (url) => {
                    const path = await this.assetService.moveImage(
                        url,
                        assetDirectory,
                    )
                    return path
                }),
            )
            newProduct.images = images
            // for await (const createAssetDto of createAssetsDto) {
            //     createAssetDto.productId = newProduct.id
            //     await this.assetService
            //         .withTransaction(transactionManager)
            //         .createAsset(createAssetDto, assetDirectory)
            // }
            newProduct = await this.productRepository.save(newProduct)
            return newProduct
        })
    }

    async updateProduct(
        productId: string,
        updateProductDto: UpdateProductDto,
    ): Promise<Product> {
        const { assets, deletedAssets, ...productDto } = updateProductDto
        if (productDto.productCategoryId)
            await this.productCategoryService.getProductCategoryById(
                productDto.productCategoryId,
            )
        const product = await this.getProductById(productId, true)
        Object.assign(product, productDto)
        return this.atomicPhase_(async (transactionManager) => {
            if (assets.length) {
                const assetDirectory = `uploads/products/${product.id}`
                const images = await Promise.all(
                    assets.map(async (url) => {
                        const path = await this.assetService.moveImage(
                            url,
                            assetDirectory,
                        )
                        return path
                    }),
                )
                product.images = product.images.concat(images)
            }
            if (deletedAssets.length) {
                product.images = product.images.filter(
                    (image) => !deletedAssets.find((dA) => dA === image),
                )
            }
            // if (updateAssetDto) {
            //     const assetDirectory = `uploads/products/${product.id}`
            //     await this.assetService
            //         .withTransaction(transactionManager)
            //         .updateAsset(
            //             product.assetId,
            //             updateAssetDto,
            //             assetDirectory,
            //         )
            // }
            const updatedProduct = await this.productRepository.save(product)
            await FileUtils.DeleteFiles(deletedAssets)
            return updatedProduct
        })
    }

    async deleteProduct(productId: string): Promise<void> {
        // const product = await this.getProductById(productId, true)
        await this.productRepository.softDelete(productId)
    }

    async restoreProduct(productId: string): Promise<void> {
        // const product = await this.getProductById(productId, true)
        await this.productRepository.restore(productId)
    }
}
