/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
    I18nValidationExceptionFilter,
    i18nValidationErrorFactory,
} from 'nestjs-i18n'

import { AppModule } from './modules'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const globalPrefix = process.env.PREFIX || 'api/v1'
    app.setGlobalPrefix(globalPrefix)

    app.enableCors()

    app.useGlobalFilters(new I18nValidationExceptionFilter())
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            exceptionFactory: i18nValidationErrorFactory,
        }),
    )

    const port = process.env.API_PORT || 3333
    await app.listen(port)

    Logger.log(
        `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
    )
}

bootstrap()
