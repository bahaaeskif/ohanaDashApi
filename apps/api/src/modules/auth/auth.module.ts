import { Module } from '@nestjs/common'

import { JwtHelperModule } from '@store/utils/api'

import { UserModule } from '../user'
import { AuthService } from './auth.service'
import { DashboardAuthController } from './dashboard-auth.controller'
import { StoreAuthController } from './store-auth.controller'

@Module({
    imports: [JwtHelperModule, UserModule],
    providers: [AuthService],
    controllers: [DashboardAuthController, StoreAuthController],
    exports: [AuthService],
})
export class AuthModule {}
