import {
    CreateEmployeeDto,
    UpdateEmployeeDto,
    UpdatePasswordDto,
} from '@store/dto'
import {
    ApiRoutes,
    BaseResponse,
    GetEmployeesResponse,
    IEmployee,
} from '@store/types'

import { baseDeleteApi, baseGetApi, basePostApi, baseUpdateApi } from './base'

export const getEmployeesApi = async () => {
    const data = await baseGetApi<GetEmployeesResponse>({
        path: ApiRoutes.EMPLOYEES,
    })
    return data
}

export const getEmployeeApi = async (employeeId: string) => {
    const data = await baseGetApi<IEmployee>({
        path: `${ApiRoutes.EMPLOYEES}/${employeeId}`,
    })
    return data
}

export const addEmployeeApi = async (createEmployeeDto: CreateEmployeeDto) => {
    const data = await basePostApi<CreateEmployeeDto, BaseResponse<IEmployee>>({
        path: ApiRoutes.EMPLOYEES,
        data: createEmployeeDto,
    })
    return data
}

export const updateEmployeeApi = async (
    employeeId: string,
    updateEmployeeDto: UpdateEmployeeDto,
) => {
    const data = await baseUpdateApi<
        UpdateEmployeeDto,
        BaseResponse<IEmployee>
    >({
        path: `${ApiRoutes.EMPLOYEES}/${employeeId}`,
        data: updateEmployeeDto,
    })
    return data
}

export const updateEmployeePasswordApi = async (
    employeeId: string,
    updatePasswordDto: UpdatePasswordDto,
) => {
    const data = await baseUpdateApi<
        UpdatePasswordDto,
        BaseResponse<IEmployee>
    >({
        path: `${ApiRoutes.EMPLOYEES}/password/${employeeId}`,
        data: updatePasswordDto,
    })
    return data
}

export const deleteEmployeeApi = async (employeeId: string) => {
    const data = await baseDeleteApi<void>({
        path: `${ApiRoutes.EMPLOYEES}/${employeeId}`,
    })
    return data
}
