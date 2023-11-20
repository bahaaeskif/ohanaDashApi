import { Logger, Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'

import { DatabaseModule } from './database/database.module'
import { HttpExceptionFilter } from './filters'
import { MyI18nModule } from './i18n'
import { MyPassportModule } from './passport/passport.module'
import { QueueModule } from './queues'
import { MyScheduleModule } from './schedule'
import { MyStaticServerModule } from './static-server'

@Module({
    imports: [
        DatabaseModule,
        MyI18nModule,
        MyPassportModule,
        QueueModule,
        MyScheduleModule,
        MyStaticServerModule,
    ],
    providers: [
        Logger,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class ApiCoreModule {}
