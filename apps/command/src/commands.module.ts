import 'dotenv/config'

import { Module } from '@nestjs/common'

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
        InitStoreModule,
    ],
    providers: [],
})
export class CommandsModule {}
