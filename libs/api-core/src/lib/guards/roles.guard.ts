import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { HttpException } from '@store/types'

import { BaseGuard } from './base.guard'

@Injectable()
export class RolesGuard extends BaseGuard implements CanActivate {
    constructor(reflector: Reflector) {
        super(reflector)
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.isPublic(context)
        if (isPublic) return true
        const roles = this.roles(context)
        const { user } = context.switchToHttp().getRequest()
        if (roles) {
            const checkRole = roles.includes(user?.role)
            if (checkRole) return true
            throw new ForbiddenException(HttpException.FORBIDDEN)
        }
        return true
    }
}
