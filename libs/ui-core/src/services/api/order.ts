import { UpdateOrderStatusDto } from '@store/dto'
import { ApiRoutes, BaseResponse, IEmployee } from '@store/types'

import { baseDeleteApi, baseUpdateApi } from './base'

export const updateOrderStatusApi = async (
    orderId: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
) => {
    const data = await baseUpdateApi<
        UpdateOrderStatusDto,
        BaseResponse<IEmployee>
    >({
        path: `${ApiRoutes.ORDERS}/status/${orderId}`,
        data: updateOrderStatusDto,
    })
    return data
}

export const deleteOrderApi = async (orderId: string) => {
    const data = await baseDeleteApi<void>({
        path: `${ApiRoutes.ORDERS}/${orderId}`,
    })
    return data
}
