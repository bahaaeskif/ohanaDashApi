import { ApiRoutes, CustomUseQueryOptions, IEmployee } from '@store/types'
import { request } from '@store/ui-core/api'

import { useCustomQuery } from '../../use-query.hook'
import { MyQueryKey } from './query-key.enum'

type T_EMPLOYEES = IEmployee[]
export const useEmployeesQuery = (
    options?: CustomUseQueryOptions<T_EMPLOYEES>,
) => {
    const employeesQuery = useCustomQuery<T_EMPLOYEES>(
        MyQueryKey.EMPLOYEES,
        () => request({ url: ApiRoutes.EMPLOYEES }),
        options,
    )

    return employeesQuery
}
