import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DATA_SOURCE_OPTIONS } from './database.config'

@Module({
    imports: [TypeOrmModule.forRoot(DATA_SOURCE_OPTIONS)],
})
export class DatabaseModule {}
