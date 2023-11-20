import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    Logger,
} from '@nestjs/common'
import { I18nService } from 'nestjs-i18n'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
    constructor(private i18n: I18nService, private readonly logger: Logger) {}
    async catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const request: Request = ctx.getRequest()
        const statusCode = exception.getStatus()
        const errorDetail = exception.getResponse()['detail']

        const lang = request.headers['accept-language'] || 'en'
        const error = `${lang}.${exception.message}`
        const property = exception.getResponse()['error']

        this.logger.error(exception)
        response.status(statusCode).json({
            statusCode,
            errors: errorDetail
                ? `${exception.message}, ${errorDetail}`
                : await this.i18n.translate(error, {
                      lang: lang,
                      args: {
                          property: property,
                      },
                  }),
        })
    }
}
