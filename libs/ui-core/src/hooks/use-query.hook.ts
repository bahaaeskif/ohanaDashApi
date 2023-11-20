import { AxiosError, AxiosResponse } from 'axios'
import { QueryFunction, QueryKey, UseQueryResult, useQuery } from 'react-query'

import { CustomUseQueryOptions, IErrorsResponse } from '@store/types'

import { Toast } from '../services'
import { useRefreshTokenMutation } from './custom'

export const useCustomQuery = <TData = any>(
    queryKey: QueryKey,
    queryFn: QueryFunction<AxiosResponse<TData>, QueryKey>,
    options?: CustomUseQueryOptions<TData>,
): UseQueryResult<AxiosResponse<TData>, AxiosError<IErrorsResponse>> => {
    const { mutateAsync } = useRefreshTokenMutation(queryKey)

    const onSuccess = (response: AxiosResponse<any>) => {
        if (options?.onSuccess) options.onSuccess(response)
    }

    const onError = async (error: AxiosError<any>) => {
        if (error.response.status === 401) await mutateAsync({})
        else {
            if (typeof error.response.data.errors === 'string')
                Toast(error.response.data.errors, 'error')
        }
        if (options?.onError) options.onError(error)
    }

    const query = useQuery<AxiosResponse<TData>, AxiosError<IErrorsResponse>>(
        queryKey,
        queryFn,
        {
            refetchInterval: false,
            refetchOnMount: 'always',
            refetchOnReconnect: 'always',
            refetchOnWindowFocus: false,
            ...options,
            onSuccess,
            onError,
        },
    )

    return query
}
