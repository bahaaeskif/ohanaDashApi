import { ApiRoutes, CustomUseQueryOptions, IOrder } from '@store/types'
import { request } from '@store/ui-core/api'

import { useCustomQuery } from '../../use-query.hook'
import { MyQueryKey } from './query-key.enum'

type T_ORDERS = IOrder[]
export const useOrdersQuery = (options?: CustomUseQueryOptions<T_ORDERS>) => {
    const ordersQuery = useCustomQuery<T_ORDERS>(
        MyQueryKey.ORDERS,
        () => request({ url: ApiRoutes.ORDERS }),
        options,
    )

    return ordersQuery
}
