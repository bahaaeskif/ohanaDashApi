import { IProduct } from '@store/types'

import { BaseResponse } from '../base/base-response.interface'

export interface GetProductsResponse extends BaseResponse<IProduct[]> {}
