import { IAsset } from '../asset'
import { BaseInterface } from '../base'
import { IProductCategory } from '../product-category'

export interface IProduct extends BaseInterface {
    name_ar: string
    name_en: string
    price: number
    model: string
    details_ar: string
    details_en: string
    colors: string[]
    sizes: string[]
    productCategoryId: string
    productCategory: IProductCategory
    assets: IAsset[]
    images: string[]
}
