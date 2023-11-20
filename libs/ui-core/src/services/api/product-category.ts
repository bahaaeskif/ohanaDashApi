import { CreateProductCategoryDto, UpdateProductCategoryDto } from '@store/dto'
import {
    ApiRoutes,
    BaseResponse,
    GetProductsCategoriesResponse,
    IProductCategory,
} from '@store/types'

import { baseDeleteApi, baseGetApi, basePostApi, baseUpdateApi } from './base'

export const getProductsCategoriesApi = async () => {
    const data = await baseGetApi<GetProductsCategoriesResponse>({
        path: ApiRoutes.PRODUCTS_CATEGORIES,
    })
    return data
}

export const getAllProductsCategoriesApi = async () => {
    const data = await baseGetApi<GetProductsCategoriesResponse>({
        path: `${ApiRoutes.PRODUCTS_CATEGORIES}/all`,
    })
    return data
}

export const getProductCategoryApi = async (productCategoryId: string) => {
    const data = await baseGetApi<IProductCategory>({
        path: `${ApiRoutes.PRODUCTS_CATEGORIES}/${productCategoryId}`,
    })
    return data
}

export const addProductCategoryApi = async (
    createProductCategoryDto: CreateProductCategoryDto,
) => {
    const data = await basePostApi<
        CreateProductCategoryDto,
        BaseResponse<IProductCategory>
    >({
        path: ApiRoutes.PRODUCTS_CATEGORIES,
        data: createProductCategoryDto,
    })
    return data
}

export const updateProductCategoryApi = async (
    productCategoryId: string,
    updateProductCategoryDto: UpdateProductCategoryDto,
) => {
    const data = await baseUpdateApi<
        UpdateProductCategoryDto,
        BaseResponse<IProductCategory>
    >({
        path: `${ApiRoutes.PRODUCTS_CATEGORIES}/${productCategoryId}`,
        data: updateProductCategoryDto,
    })
    return data
}

export const restoreProductCategoryApi = async (productCategoryId: string) => {
    const data = await baseUpdateApi<void>({
        path: `${ApiRoutes.PRODUCTS_CATEGORIES}/restore/${productCategoryId}`,
        data: null,
    })
    return data
}

export const deleteProductCategoryApi = async (productCategoryId: string) => {
    const data = await baseDeleteApi<void>({
        path: `${ApiRoutes.PRODUCTS_CATEGORIES}/${productCategoryId}`,
    })
    return data
}
