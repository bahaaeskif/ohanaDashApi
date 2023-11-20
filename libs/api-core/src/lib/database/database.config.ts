import 'dotenv/config'

import { DataSource, DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

import { ENTITIES } from './entities'
import { MIGRATIONS } from './migrations'

export const DATA_SOURCE_OPTIONS: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10),
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    entities: ENTITIES,
    migrations: MIGRATIONS,
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
    migrationsTableName: 'typeorm_migrations',
    migrationsRun: false,
}

export default new DataSource(DATA_SOURCE_OPTIONS)
