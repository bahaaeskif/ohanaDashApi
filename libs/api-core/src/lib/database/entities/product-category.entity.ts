import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'

import { Asset } from './asset.entity'
import { BaseEntity } from './base.entity'
import { Product } from './product.entity'

@Entity({ orderBy: { deletedAt: 'DESC', order: 'ASC' } })
export class ProductCategory extends BaseEntity {
    @Column({ length: 255 })
    name_ar: string

    @Column({ length: 255 })
    name_en: string

    @Column({ type: 'int' })
    order: number

    @OneToMany(() => Product, (product) => product.productCategory, {
        cascade: true,
    })
    products: Product[]

    @OneToOne(() => Asset, (asset) => asset.productCategory, { cascade: true })
    @JoinColumn({ name: 'asset_id' })
    asset: Asset
    @Column({ type: 'uuid', nullable: true })
    assetId: string
}
