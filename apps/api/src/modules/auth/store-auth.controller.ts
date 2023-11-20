import { Body, Controller, Post } from '@nestjs/common'

import { LoginDto, RegisterDto } from '@store/dto'
import { TokenType } from '@store/types'

import { AuthService } from './auth.service'

@Controller('store/auth')
export class StoreAuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto)
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.storeLogin(loginDto, TokenType.STORE)
    }
}
