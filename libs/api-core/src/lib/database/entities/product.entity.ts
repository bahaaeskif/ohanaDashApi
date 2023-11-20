import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

import { Asset } from './asset.entity'
import { BaseEntity } from './base.entity'
import { ProductCategory } from './product-category.entity'

@Entity({ orderBy: { deletedAt: 'DESC', createdAt: 'DESC' } })
export class Product extends BaseEntity {
    @Column({ length: 255 })
    name_ar: string

    @Column({ length: 255 })
    name_en: string

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    price: number

    @Column({ length: 255 })
    model: string

    @Column()
    details_ar: string

    @Column()
    details_en: string

    @Column({ type: 'text', array: true, default: [] })
    colors: string[]

    @Column({ type: 'text', array: true, default: [] })
    sizes: string[]

    @Column({ type: 'text', array: true, default: [] })
    images: string[]

    @ManyToOne(() => ProductCategory)
    @JoinColumn()
    productCategory: ProductCategory
    @Column({ type: 'uuid' })
    productCategoryId: string

    @OneToMany(() => Asset, (asset) => asset.product, { cascade: true })
    assets: Asset[]
}
