import { SetMetadata } from '@nestjs/common'

import { ROLES_KEY } from '@store/constant'
import { UserRole } from '@store/types'

export const Roles = (roles: UserRole[]) => SetMetadata(ROLES_KEY, roles)
