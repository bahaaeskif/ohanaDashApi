import { ApiRoutes, BaseResponse } from '@store/types'

import { basePostApi } from './base'

export const uploadFileApi = async (file: any) => {
    const formData = new FormData()
    formData.append('file', file)
    const data = await basePostApi<
        any,
        BaseResponse<{
            url: string
        }>
    >({
        path: ApiRoutes.ASSET,
        data: formData,
    })
    return data
}
