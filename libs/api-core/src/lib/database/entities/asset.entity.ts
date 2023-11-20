import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'

import { ISizeUrl } from '@store/types'

import { BaseEntity } from './base.entity'
import { ProductCategory } from './product-category.entity'
import { Product } from './product.entity'

@Entity({ orderBy: { order: 'ASC' } })
export class Asset extends BaseEntity {
    @Column({ length: 255 })
    title: string

    @Column({ type: 'int', default: 1 })
    order: number

    @Column({ length: 255 })
    mimeType: string

    @Column({ type: 'jsonb' })
    sizesUrls: ISizeUrl

    @OneToOne(() => ProductCategory, (productCategory) => productCategory.asset)
    productCategory: ProductCategory

    @ManyToOne(() => Product, (product) => product.assets)
    @JoinColumn()
    product?: Product
    @Column({ type: 'uuid', nullable: true })
    productId?: string
}
