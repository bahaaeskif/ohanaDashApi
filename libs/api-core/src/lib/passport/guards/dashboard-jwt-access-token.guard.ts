import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

import { HttpException } from '@store/types'

import { StrategyName } from '../strategies'

@Injectable()
export class DashboardJwtAccessTokenGuard extends AuthGuard(
    StrategyName.DASHBOARD_ACCESS_TOKEN_STRATEGY,
) {
    constructor(private reflector: Reflector) {
        super()
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context)
    }

    handleRequest(err: any, user: any, info: any) {
        if (err || !user)
            throw err || new UnauthorizedException(HttpException.UNAUTHORIZED)
        return user
    }
}
