import { Module } from '@nestjs/common'

import { BcryptModule } from '@store/utils/api'

import { CustomerController, EmployeeController } from './controllers'
import { CustomerService, EmployeeService } from './services'

@Module({
    imports: [BcryptModule],
    providers: [CustomerService, EmployeeService],
    controllers: [CustomerController, EmployeeController],
    exports: [CustomerService, EmployeeService],
})
export class UserModule {}
