import 'dotenv/config'

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DatabaseModule } from '@store/api-core/database'

import { environment } from '../../environments/environment'
import { CreateAdminModule } from './create-admin'
import { InitStoreModule } from './init-store'

@Module({
    imports: [
        // ConfigModule.forRoot({
        //   load: [() => environment],
        //   isGlobal: true,
        // }),
        // TypeOrmModule.forRootAsync({
        //   useClass: TypeOrmConfigService,
        // }),

        ConfigModule.forRoot({
            load: [() => environment],
            isGlobal: true,
        }),
        DatabaseModule,

        CreateAdminModule,
        InitStoreModule,
    ],
    providers: [],
})
export class CommandsModule {}
