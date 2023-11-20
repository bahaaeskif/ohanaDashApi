import {
    ApiRoutes,
    BaseResponse,
    GetProductsResponse,
    IErrorsResponse,
    IProduct,
} from '@store/types'
import { CreateProductDto, UpdateProductDto } from '@store/dto'

import { baseDeleteApi, baseGetApi, basePostApi, baseUpdateApi } from './base'

export const getProductsApi = async () => {
    const data = await baseGetApi<GetProductsResponse>({
        path: ApiRoutes.PRODUCTS,
    })
    return data
}

export const getProductApi = async (productId: string) => {
    const data = await baseGetApi<IProduct>({
        path: `${ApiRoutes.PRODUCTS}/${productId}`,
    })
    return data
}

export const addProductApi = async (createProductDto: CreateProductDto) => {
    const data = await basePostApi<CreateProductDto, BaseResponse<IProduct>>({
        path: ApiRoutes.PRODUCTS,
        data: createProductDto,
    })
    return data
}

export const updateProductApi = async (
    productId: string,
    updateProductDto: UpdateProductDto,
) => {
    const data = await baseUpdateApi<UpdateProductDto, BaseResponse<IProduct>>({
        path: `${ApiRoutes.PRODUCTS}/${productId}`,
        data: updateProductDto,
    })
    return data
}

export const restoreProductApi = async (productId: string) => {
    const data = await baseUpdateApi<void>({
        path: `${ApiRoutes.PRODUCTS}/restore/${productId}`,
        data: null,
    })
    return data
}

export const deleteProductApi = async (productId: string) => {
    const data = await baseDeleteApi<void>({
        path: `${ApiRoutes.PRODUCTS}/${productId}`,
    })
    return data
}
