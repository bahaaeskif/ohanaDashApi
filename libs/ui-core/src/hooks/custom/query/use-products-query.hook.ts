import { ApiRoutes, CustomUseQueryOptions, IProduct } from '@store/types'
import { request } from '@store/ui-core/api'

import { useCustomQuery } from '../../use-query.hook'
import { MyQueryKey } from './query-key.enum'

type T_PRODUCTS = IProduct[]
export const useProductsQuery = (
    options?: CustomUseQueryOptions<T_PRODUCTS>,
) => {
    const productsQuery = useCustomQuery<T_PRODUCTS>(
        MyQueryKey.PRODUCTS,
        () => request({ url: ApiRoutes.PRODUCTS }),
        options,
    )

    return productsQuery
}
