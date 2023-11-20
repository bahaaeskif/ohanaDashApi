import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { StrategyName } from './strategy-name.enum'

@Injectable()
export class StoreJwtAccessTokenStrategy extends PassportStrategy(
    Strategy,
    StrategyName.STORE_ACCESS_TOKEN_STRATEGY,
) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get(
                'jwt.store.accessTokenConfig.secret',
            ),
        })
    }

    async validate(payload: any) {
        console.log(
            '🚀 ~ file: store-jwt-access-token.strategy.ts:24 ~ validate ~ payload:',
            payload,
        )
        console.log(StoreJwtAccessTokenStrategy.name)
    }
}
