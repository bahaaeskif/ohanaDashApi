import { IBaseUser } from './base-user.interface'
import { UserRole } from './user-role.enum'

export interface IEmployee extends IBaseUser {
    role: UserRole
}
