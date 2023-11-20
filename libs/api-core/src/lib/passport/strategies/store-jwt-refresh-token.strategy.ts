import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { StrategyName } from './strategy-name.enum'

@Injectable()
export class StoreJwtRefreshTokenStrategy extends PassportStrategy(
    Strategy,
    StrategyName.STORE_REFRESH_TOKEN_STRATEGY,
) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('store-refresh-token'),
            ignoreExpiration: false,
            secretOrKey: configService.get(
                'jwt.store.refreshTokenConfig.secret',
            ),
        })
    }

    async validate(payload: any) {
        console.log(StoreJwtRefreshTokenStrategy.name)
    }
}
