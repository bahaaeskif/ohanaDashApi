import { AxiosResponse } from 'axios'
import { UseMutationOptions } from 'react-query'

export interface CustomUseMutationOptions<
    TData = any,
    TError = any,
    TVariable = any,
> extends Omit<
        UseMutationOptions<AxiosResponse<TData>, TError, TVariable>,
        'mutationKey' | 'mutationFn'
    > {}
