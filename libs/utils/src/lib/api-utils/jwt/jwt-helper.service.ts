import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'

import { JwtConfig, PayloadType, TokenConfig, TokenType } from '@store/types'

@Injectable()
export class JwtHelperService {
    constructor(
        private configService: ConfigService,
        private jwtService: JwtService,
    ) {}

    async generateTokens<T extends PayloadType>(
        payload: T,
        tokensType: TokenType,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        const { accessTokenConfig, refreshTokenConfig }: JwtConfig =
            await this.configService.getOrThrow(`jwt.${tokensType}`)
        const accessToken = await this.generateToken(payload, accessTokenConfig)
        const refreshToken = await this.generateToken(
            payload,
            refreshTokenConfig,
        )
        return { accessToken, refreshToken }
    }

    async verifyAccessToken(
        accessToken: string,
        tokensType: TokenType,
    ): Promise<any> {
        const accessTokenConfig: TokenConfig =
            await this.configService.getOrThrow(
                `jwt.${tokensType}.accessTokenConfig`,
            )
        const accessTokenPayload = await this.verifyToken(
            accessToken,
            accessTokenConfig,
        )
        return accessTokenPayload
    }

    async verifyRefreshToken(
        refreshToken: string,
        tokensType: TokenType,
    ): Promise<any> {
        const refreshTokenConfig: TokenConfig =
            await this.configService.getOrThrow(
                `jwt.${tokensType}.refreshTokenConfig`,
            )
        const refreshTokenPayload = await this.verifyToken(
            refreshToken,
            refreshTokenConfig,
        )
        return refreshTokenPayload
    }

    async generateToken(payload: any, config: JwtSignOptions) {
        const token = await this.jwtService.signAsync(payload, { ...config })
        return token
    }

    async verifyToken(token: any, config: JwtSignOptions) {
        const payload = await this.jwtService.verifyAsync(token, config)
        return payload
    }
}
