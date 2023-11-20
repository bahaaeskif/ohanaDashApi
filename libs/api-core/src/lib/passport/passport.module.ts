import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import {
    DashboardJwtAccessTokenStrategy,
    DashboardJwtRefreshTokenStrategy,
    StoreJwtAccessTokenStrategy,
    StoreJwtRefreshTokenStrategy,
} from './strategies'

@Module({
    imports: [PassportModule],
    providers: [
        DashboardJwtAccessTokenStrategy,
        DashboardJwtRefreshTokenStrategy,
        StoreJwtAccessTokenStrategy,
        StoreJwtRefreshTokenStrategy,
    ],
    exports: [],
})
export class MyPassportModule {}
