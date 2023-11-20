import { BaseInterface } from '../base'
import { IProduct } from '../product'
import { IProductCategory } from '../product-category'
import { ISizeUrl } from './size-url.interface'

export interface IAsset extends BaseInterface {
    title: string
    order: number
    mimeType: string
    sizesUrls: ISizeUrl
    productCategory: IProductCategory
    product: IProduct
    productId: string
}
