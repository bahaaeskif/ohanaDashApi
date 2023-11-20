import { Controller, Get } from '@nestjs/common'

import { HomeService } from './home.service'

@Controller('store/home')
export class HomeController {
    constructor(private readonly homeService: HomeService) {}

    @Get()
    async home() {
        return this.homeService.home()
    }
}
