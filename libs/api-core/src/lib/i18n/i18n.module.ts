import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n'
import { join } from 'path'

@Module({
    imports: [
        I18nModule.forRootAsync({
            inject: [ConfigService],
            resolvers: [new AcceptLanguageResolver()],
            useFactory: async (configService: ConfigService) => ({
                fallbackLanguage: 'en',
                loaderOptions: {
                    path: join(__dirname, configService.get('paths.i18n')),
                    watch: true,
                },
            }),
        }),
    ],
})
export class MyI18nModule {}
