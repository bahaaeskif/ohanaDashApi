import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'

import { Customer, Employee } from '@store/api-core/database'
import { TransactionBaseService } from '@store/api-core/service'
import { LoginDto, RegisterDto } from '@store/dto'
import {
    DashboardPayload,
    IEmployee,
    LoginResponse,
    StorePayload,
    StoreRequest,
    TokenType,
} from '@store/types'
import { JwtHelperService } from '@store/utils/api'

import { CustomerService, EmployeeService } from '../user'

@Injectable()
export class AuthService extends TransactionBaseService {
    constructor(
        entityManager: EntityManager,
        private jwtService: JwtHelperService,
        private employeeService: EmployeeService,
        private customerService: CustomerService,
    ) {
        super(entityManager)
    }

    async register(registerDto: RegisterDto): Promise<boolean> {
        await this.customerService.checkUserExistByUsername(
            registerDto.username,
        )
        return this.atomicPhase_(async (transactionManager) => {
            const newUser = await this.customerService
                .withTransaction(transactionManager)
                .createUser(registerDto)
            return true
        })
    }

    async dashboardLogin(
        loginDto: LoginDto,
    ): Promise<LoginResponse<IEmployee>> {
        const user = await this.employeeService.findUserForLogin(loginDto)
        const tokenPayload: DashboardPayload = {
            id: user.id,
            username: user.username,
            role: user.role,
        }
        const tokens = await this.jwtService.generateTokens<DashboardPayload>(
            tokenPayload,
            TokenType.DASHBOARD,
        )
        return { ...tokens, user }
    }

    async dashboardLoginWithRefreshToken(req: StoreRequest<Employee>) {
        const tokenPayload: DashboardPayload = {
            id: req.user.id,
            username: req.user.username,
            role: req.user.role,
        }
        const tokens = await this.jwtService.generateTokens<DashboardPayload>(
            tokenPayload,
            TokenType.DASHBOARD,
        )
        return { ...tokens, user: req.user }
    }

    async storeLogin(
        loginDto: LoginDto,
        tokenType: TokenType,
    ): Promise<LoginResponse<Customer>> {
        const user = await this.customerService.findUserForLogin(loginDto)
        const tokenPayload: StorePayload = {
            id: user.id,
            username: user.username,
        }
        const tokens = await this.jwtService.generateTokens<StorePayload>(
            tokenPayload,
            tokenType,
        )
        return { ...tokens, user }
    }
}
