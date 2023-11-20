import { IntersectionType } from '@nestjs/mapped-types'

import { UserRole } from '@store/types'
import { IsEnum, IsNotEmpty } from '@store/validators'

import { CreateUserDto } from './create-user.dto'

export class CreateEmployeeDto extends IntersectionType(CreateUserDto) {
    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole
}
