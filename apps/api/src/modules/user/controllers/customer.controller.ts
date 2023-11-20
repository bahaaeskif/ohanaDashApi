import { Controller } from '@nestjs/common'

import { CustomerService } from '../services'

@Controller('dashboard/customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}
}
