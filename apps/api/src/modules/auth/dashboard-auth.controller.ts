import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common'

import { LoginDto } from '@store/dto'

import { Employee } from '@store/api-core/database'
import { DashboardJwtRefreshTokenGuard } from '@store/api-core/passport'
import { StoreRequest } from '@store/types'
import { AuthService } from './auth.service'

@Controller('dashboard/auth')
export class DashboardAuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.dashboardLogin(loginDto)
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(DashboardJwtRefreshTokenGuard)
    @Post('refresh-token')
    loginWithRefreshToken(@Req() req: StoreRequest<Employee>) {
        return this.authService.dashboardLoginWithRefreshToken(req)
    }
}
