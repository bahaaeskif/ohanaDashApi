export * from './asset.entity'
export * from './order'
export * from './product-category.entity'
export * from './product.entity'
export * from './user'

import { Asset } from './asset.entity'
import { Order, OrderItem } from './order'
import { ProductCategory } from './product-category.entity'
import { Product } from './product.entity'
import { Customer, Employee } from './user'

export const ENTITIES = [
    Asset,
    Order,
    OrderItem,
    ProductCategory,
    Product,
    Customer,
    Employee,
]
