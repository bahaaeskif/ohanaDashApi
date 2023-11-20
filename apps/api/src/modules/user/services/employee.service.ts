import { BadRequestException, Injectable } from '@nestjs/common'
import { EntityManager, FindOptionsWhere, Not } from 'typeorm'

import { Employee } from '@store/api-core/database'
import { TransactionBaseService } from '@store/api-core/service'
import {
    CreateEmployeeDto,
    LoginDto,
    UpdateEmployeeDto,
    UpdatePasswordDto,
} from '@store/dto'
import { HttpException } from '@store/types'
import { BcryptService } from '@store/utils/api'

@Injectable()
export class EmployeeService extends TransactionBaseService {
    constructor(
        private entityManager: EntityManager,
        private bcryptService: BcryptService,
    ) {
        super(entityManager)
    }

    get employeeRepository() {
        return this.activeManager_.getRepository(Employee)
    }

    async getUsers(): Promise<Employee[]> {
        const employees = await this.employeeRepository.find({
            order: { role: 1, createdAt: 1 },
        })
        return employees
    }

    async getUserById(
        employeeId: string,
        throwError = false,
    ): Promise<Employee> {
        const employee = await this.employeeRepository.findOne({
            where: { id: employeeId },
        })
        if (!employee && throwError)
            throw new BadRequestException(HttpException.NOT_FOUND)
        return employee
    }

    async createUser(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        const { password } = createEmployeeDto
        const hashedPassword = await this.bcryptService.hash(password)
        let newEmployee = this.employeeRepository.create({
            ...createEmployeeDto,
            password: hashedPassword,
        })
        newEmployee = await this.employeeRepository.save(newEmployee)
        return newEmployee
    }

    async updateUser(employeeId: string, updateEmployeeDto: UpdateEmployeeDto) {
        const { username } = updateEmployeeDto
        const user = await this.getUserById(employeeId)
        const checkUsername = await this.employeeRepository.findOneBy({
            id: Not(employeeId),
            username,
        })
        if (checkUsername)
            throw new BadRequestException('Phone Number Already Exist')
        Object.assign(user, updateEmployeeDto)
        await this.employeeRepository.save(user)
        return user
    }

    async updatePassword(
        employeeId: string,
        updatePasswordDto: UpdatePasswordDto,
    ) {
        const user = await this.getUserById(employeeId)
        const { oldPassword, newPassword } = updatePasswordDto
        if (oldPassword !== newPassword) {
            await this.bcryptService.checkUserPassword(
                oldPassword,
                user.password,
            )
            const newHashedPassword = await this.bcryptService.hash(newPassword)
            user.password = newHashedPassword
            await this.employeeRepository.save(user)
            return true
        }
        return false
    }

    async deleteUser(employeeId: string) {
        const user = await this.getUserById(employeeId, true)
        await this.employeeRepository.softDelete(user.id)
    }

    async findUserForLogin(loginDto: LoginDto): Promise<Employee> {
        const { password, username } = loginDto
        const user = await this.checkUserExistByUsername(
            username,
            {},
            false,
            true,
        )
        await this.bcryptService.checkUserPassword(password, user.password)
        return user
    }

    async checkUserExistByUsername(
        username: string,
        findOptions?: FindOptionsWhere<Employee>,
        throwErrorIfExist = false,
        throwErrorIfNotExist = false,
    ): Promise<Employee> {
        const user = await this.findUserByUsername(username, findOptions)
        if (user && throwErrorIfExist)
            throw new BadRequestException(HttpException.USER_ALREADY_EXIST)
        if (!user && throwErrorIfNotExist)
            throw new BadRequestException(HttpException.USER_NOT_EXIST)
        return user
    }

    async findUserByUsername(
        username: string,
        findOptions?: FindOptionsWhere<Employee>,
    ): Promise<Employee> {
        const employee = await this.employeeRepository.findOneBy({
            username,
            ...findOptions,
        })
        return employee
    }
}
