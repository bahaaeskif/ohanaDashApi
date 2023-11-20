export interface TokenConfig {
    secret: string
    expiresIn: string
}

export interface JwtConfig {
    accessTokenConfig: TokenConfig
    refreshTokenConfig: TokenConfig
}
