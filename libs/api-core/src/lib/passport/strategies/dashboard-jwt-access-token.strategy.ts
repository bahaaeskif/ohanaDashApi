import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { DataSource } from 'typeorm'

import { DashboardPayload, HttpException, Property } from '@store/types'

import { Employee } from '../../database/entities'
import { StrategyName } from './strategy-name.enum'

@Injectable()
export class DashboardJwtAccessTokenStrategy extends PassportStrategy(
    Strategy,
    StrategyName.DASHBOARD_ACCESS_TOKEN_STRATEGY,
) {
    constructor(
        private configService: ConfigService,
        private dataSource: DataSource,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get(
                'jwt.dashboard.accessTokenConfig.secret',
            ),
        })
    }

    get employeeRepository() {
        return this.dataSource.getRepository(Employee)
    }

    async validate(payload: DashboardPayload) {
        const { id, username, role } = payload
        const user = await this.employeeRepository.findOneBy({
            id,
            username,
            role,
        })
        if (!user)
            throw new UnauthorizedException(
                HttpException.NOT_FOUND,
                Property.USER,
            )
        delete user.password
        return user
    }
}
