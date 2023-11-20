import { LoginDto } from '@store/dto'
import { ApiRoutes, ICustomer, IEmployee, LoginResponse } from '@store/types'

import { basePostApi } from './base'

export const loginApi = async <UserType extends IEmployee | ICustomer>(
    loginInput: LoginDto,
) => {
    const data = await basePostApi<LoginDto, LoginResponse<UserType>>({
        path: ApiRoutes.LOGIN,
        data: loginInput,
    })
    return data
}
