import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common'

import { Employee } from '@store/api-core/database'
import { Roles } from '@store/api-core/decorator'
import { RolesGuard } from '@store/api-core/guard'
import { DashboardJwtAccessTokenGuard } from '@store/api-core/passport'
import {
    CreateEmployeeDto,
    UpdateEmployeeDto,
    UpdatePasswordDto,
} from '@store/dto'
import { UserRole } from '@store/types'

import { EmployeeService } from '../services'

@Controller('dashboard/employees')
@UseGuards(DashboardJwtAccessTokenGuard, RolesGuard)
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getUsers(): Promise<Employee[]> {
        return this.employeeService.getUsers()
    }

    @Get(':employeeId')
    @HttpCode(HttpStatus.OK)
    getUser(@Param('employeeId') employeeId: string): Promise<Employee> {
        return this.employeeService.getUserById(employeeId)
    }

    @Post()
    @Roles([UserRole.ADMIN])
    @HttpCode(HttpStatus.CREATED)
    addUser(@Body() createEmployeeDto: CreateEmployeeDto) {
        return this.employeeService.createUser(createEmployeeDto)
    }

    @Put(':employeeId')
    @Roles([UserRole.ADMIN])
    @HttpCode(HttpStatus.OK)
    updateUser(
        @Param('employeeId') employeeId: string,
        @Body() updateEmployeeDto: UpdateEmployeeDto,
    ) {
        return this.employeeService.updateUser(employeeId, updateEmployeeDto)
    }

    @Put('password/:employeeId')
    @Roles([UserRole.ADMIN])
    @HttpCode(HttpStatus.OK)
    updatePassword(
        @Param('employeeId') employeeId: string,
        @Body() updateEmployeeDto: UpdatePasswordDto,
    ) {
        return this.employeeService.updatePassword(
            employeeId,
            updateEmployeeDto,
        )
    }

    @Delete(':employeeId')
    @Roles([UserRole.ADMIN])
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteUser(@Param('employeeId') employeeId: string) {
        return this.employeeService.deleteUser(employeeId)
    }
}
