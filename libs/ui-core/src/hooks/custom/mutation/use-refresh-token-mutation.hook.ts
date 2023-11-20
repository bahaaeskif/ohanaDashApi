import { QueryKey, useQueryClient } from 'react-query'
import { useRecoilValue } from 'recoil'

import { ApiRoutes, ICustomer, IEmployee, LoginResponse } from '@store/types'
import { refreshTokenAtom } from '@store/ui-core/recoil'

import { request } from '../../../services/api/base'
import { useAuth } from '../../use-auth.hook'
import { useCustomMutation } from '../../use-mutation.hook'
import { MyMutationKey } from './mutation-key.enum'

export const useRefreshTokenMutation = <
    UserType extends IEmployee | ICustomer = any,
>(
    queryKey?: QueryKey,
) => {
    const queryClient = useQueryClient()

    const { login, logout, refreshToken } = useAuth()

    const RefreshTokenMutation = useCustomMutation<LoginResponse<UserType>>(
        MyMutationKey.REFRESH_TOKEN,
        (data) =>
            request({
                url: ApiRoutes.REFRESH_TOKEN,
                method: 'POST',
                data,
                headers: {
                    'dashboard-refresh-token': refreshToken,
                },
            }),
        {
            onSuccess({ data }) {
                login(data)
                if (queryKey) queryClient.invalidateQueries(queryKey)
            },
            onError() {
                logout()
            },
        },
    )

    return RefreshTokenMutation
}
