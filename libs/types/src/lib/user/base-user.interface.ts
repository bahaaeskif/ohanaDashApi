import { BaseInterface } from '../base'
import { UserType } from './user-type.enum'

export interface IBaseUser extends BaseInterface {
    firstName: string
    lastName: string
    username: string
    password: string
}
