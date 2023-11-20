import { AxiosError, AxiosResponse } from 'axios'
import { MutationFunction, MutationKey, useMutation } from 'react-query'

import { CustomUseMutationOptions, IErrorsResponse } from '@store/types'

import { Toast } from '../services'

export const useCustomMutation = <
    TData = any,
    TVariable = any,
    TError = IErrorsResponse,
>(
    mutationKey: MutationKey,
    mutationFn: MutationFunction<AxiosResponse<TData>, TVariable>,
    options?: CustomUseMutationOptions<TData, AxiosError<TError>, TVariable>,
) => {
    const onSuccess = (
        data: AxiosResponse<any>,
        variables: any,
        context: unknown,
    ) => {
        if (options?.onSuccess) options.onSuccess(data, variables, context)
    }

    const onError = (
        error: AxiosError<any>,
        variables: any,
        context: unknown,
    ): void | Promise<unknown> => {
        if (typeof error.response.data.errors === 'string')
            Toast(error.response.data.errors, 'error')
        if (options?.onError) options.onError(error, variables, context)
    }

    const mutation = useMutation<
        AxiosResponse<TData>,
        AxiosError<TError>,
        TVariable
    >(mutationKey, mutationFn, {
        ...options,
        onError,
        onSuccess,
    })

    return mutation
}
