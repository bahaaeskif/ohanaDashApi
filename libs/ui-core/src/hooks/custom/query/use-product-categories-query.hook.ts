import {
    ApiRoutes,
    CustomUseQueryOptions,
    IProductCategory,
} from '@store/types'
import { request } from '@store/ui-core/api'

import { useCustomQuery } from '../../use-query.hook'
import { MyQueryKey } from './query-key.enum'
import { join } from '@store/utils/ui'

type T_PRODUCTS_CATEGORIES = IProductCategory[]
export const useProductCategoriesQuery = (
    options?: CustomUseQueryOptions<T_PRODUCTS_CATEGORIES>,
) => {
    const productCategoriesQuery = useCustomQuery<T_PRODUCTS_CATEGORIES>(
        MyQueryKey.PRODUCTS_CATEGORIES,
        () => request({ url: join(ApiRoutes.PRODUCTS_CATEGORIES, 'all') }),
        options,
    )

    return productCategoriesQuery
}
