import { AxiosError, AxiosResponse } from 'axios'
import { UseQueryOptions } from 'react-query'

import { IErrorsResponse } from './errors-response.interface'

export interface CustomUseQueryOptions<TData = any>
    extends Omit<
        UseQueryOptions<AxiosResponse<TData>, AxiosError<IErrorsResponse>>,
        'queryFn' | 'queryKey'
    > {}
