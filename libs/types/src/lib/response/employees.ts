import { IEmployee } from '@store/types'

import { BaseResponse } from '../base/base-response.interface'

export interface GetEmployeesResponse extends BaseResponse<IEmployee[]> {}
