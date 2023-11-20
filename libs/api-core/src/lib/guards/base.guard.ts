import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { IS_PUBLIC_KEY, ROLES_KEY } from '@store/constant'
import { UserRole } from '@store/types'

@Injectable()
export class BaseGuard {
    constructor(protected reflector: Reflector) {}

    isPublic(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        )
        return isPublic
    }

    roles(context: ExecutionContext) {
        const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ])
        return roles
    }
}
