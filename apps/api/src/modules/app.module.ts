import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ApiCoreModule } from '@store/api-core'

import { environment } from '../environments/environment'
import { AuthModule } from './auth'

import { AssetModule } from './asset'
import { HomeModule } from './home'
import { ProductModule } from './product'
import { ProductCategoryModule } from './product-category'
import { UserModule } from './user'
import { OrderModule } from './order'

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [() => environment],
            isGlobal: true,
            cache: true,
        }),
        ApiCoreModule,
        AuthModule,

        AssetModule,
        HomeModule,
        OrderModule,
        ProductModule,
        ProductCategoryModule,
        UserModule,
    ],
    providers: [],
})
export class AppModule {}
