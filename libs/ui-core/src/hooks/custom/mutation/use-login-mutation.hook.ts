import { useNavigate } from 'react-router-dom'

import { LoginDto } from '@store/dto'
import {
    ApiRoutes,
    ICustomer,
    IEmployee,
    LoginResponse,
    PageRoute,
} from '@store/types'
import { request } from '@store/ui-core/api'
import { Toast } from '@store/ui-core/services'

import { useAuth } from '../../use-auth.hook'
import { useCustomMutation } from '../../use-mutation.hook'
import { MyMutationKey } from './mutation-key.enum'
import { join } from '@store/utils/ui'

export const useLoginMutation = <UserType extends IEmployee | ICustomer>() => {
    const navigate = useNavigate()

    const { login } = useAuth<UserType>()

    const LoginMutation = useCustomMutation<LoginResponse<UserType>, LoginDto>(
        MyMutationKey.LOGIN,
        (data) =>
            request({
                url: ApiRoutes.LOGIN,
                method: 'POST',
                data,
            }),
        {
            onSuccess: ({ data }) => {
                login(data)
                navigate(join(true, PageRoute.DASHBOARD), {
                    replace: true,
                })
            },
        },
    )

    return LoginMutation
}
