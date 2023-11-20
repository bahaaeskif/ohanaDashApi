import { ICustomer, IEmployee } from '@store/types'

export interface LoginResponse<UserType extends IEmployee | ICustomer> {
    accessToken: string
    refreshToken: string
    user: UserType
}
