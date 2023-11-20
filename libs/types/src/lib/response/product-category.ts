import { IProductCategory } from '@store/types'

import { BaseResponse } from '../base/base-response.interface'

export interface GetProductsCategoriesResponse
    extends BaseResponse<IProductCategory[]> {}
