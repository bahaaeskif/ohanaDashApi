import { IAsset } from '../asset'
import { BaseInterface } from '../base'
import { IProduct } from '../product'

export interface IProductCategory extends BaseInterface {
    name_ar: string
    name_en: string
    order: number
    asset: IAsset
    assetId: string
    products?: IProduct[]
}
