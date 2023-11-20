import { Module } from '@nestjs/common'

import { ProductCategoryModule } from '../product-category'
import { HomeController } from './home.controller'
import { HomeService } from './home.service'

@Module({
    imports: [ProductCategoryModule],
    providers: [HomeService],
    controllers: [HomeController],
})
export class HomeModule {}
