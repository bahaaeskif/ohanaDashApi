export const environment = {
    production: false,
    apiUrl: process.env.API_URL || 'localhost:3333',
    apiPort: process.env.API_PORT || 3333,
    dashboardUrl: process.env.DASHBOARD_URL || 'localhost:4444',
    dashboardPort: process.env.DASHBOARD_PORT || 4444,
    nodeEnv: process.env.NODE_ENV || 'development',
    salt: process.env.BCRYPT_SALT || 10,
    paths: {
        temp: process.env.TEMP_PATH || 'temp',
        public: process.env.PUBLIC_PATH || 'public',
        uploads: process.env.UPLOADS_PATH || 'uploads',
        i18n: process.env.I18N || '/assets/i18n',
    },
    database: {
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        database: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
    },
    jwt: {
        issuer: process.env.ISSUER || 'http://chnirt.github.io',
        dashboard: {
            accessTokenConfig: {
                secret:
                    process.env.JWT_DASHBOARD_ACCESS_TOKEN_SECRET ||
                    'dashboardAccessTokenSecret',
                expiresIn:
                    process.env.JWT_DASHBOARD_ACCESS_TOKEN_EXPIRES_IN || '3h',
            },
            refreshTokenConfig: {
                secret:
                    process.env.JWT_DASHBOARD_REFRESH_TOKEN_SECRET ||
                    'dashboardRefreshTokenSecret',
                expiresIn:
                    process.env.JWT_DASHBOARD_REFRESH_TOKEN_EXPIRES_IN || '1d',
            },
        },
        store: {
            accessTokenConfig: {
                secret:
                    process.env.JWT_STORE_ACCESS_TOKEN_SECRET ||
                    'storeAccessTokenSecret',
                expiresIn:
                    process.env.JWT_STORE_ACCESS_TOKEN_EXPIRES_IN || '3h',
            },
            refreshTokenConfig: {
                secret:
                    process.env.JWT_STORE_REFRESH_TOKEN_SECRET ||
                    'storeRefreshTokenSecret',
                expiresIn:
                    process.env.JWT_STORE_REFRESH_TOKEN_EXPIRES_IN || '1d',
            },
        },
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
    },
}
