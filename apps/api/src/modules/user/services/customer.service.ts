import { BadRequestException, Injectable } from '@nestjs/common'
import { EntityManager, FindOptionsWhere } from 'typeorm'

import { Customer } from '@store/api-core/database'
import { TransactionBaseService } from '@store/api-core/service'
import { CreateUserDto, LoginDto } from '@store/dto'
import { BcryptService } from '@store/utils/api'

@Injectable()
export class CustomerService extends TransactionBaseService {
    constructor(
        entityManager: EntityManager,
        private bcryptService: BcryptService,
    ) {
        super(entityManager)
    }

    get customerRepository() {
        return this.activeManager_.getRepository(Customer)
    }

    async createUser(createUserDto: CreateUserDto): Promise<Customer> {
        const { password } = createUserDto
        const hashedPassword = await this.bcryptService.hash(password)
        let newUser = this.customerRepository.create({
            ...createUserDto,
            password: hashedPassword,
        })
        newUser = await this.customerRepository.save(newUser)
        return newUser
    }

    async findUserForLogin(loginDto: LoginDto): Promise<Customer> {
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
        findOptions?: FindOptionsWhere<Customer>,
        throwErrorIfExist = false,
        throwErrorIfNotExist = false,
    ): Promise<Customer> {
        const user = await this.findUserByUsername(username, findOptions)
        if (user && throwErrorIfExist)
            throw new BadRequestException(
                'User With This Phone Number Is Already Exist In Database',
            )
        if (!user && throwErrorIfNotExist)
            throw new BadRequestException(
                'User With This Phone Number Does Not Exist In The Database',
            )
        return user
    }

    async findUserByUsername(
        username: string,
        findOptions?: FindOptionsWhere<Customer>,
    ): Promise<Customer> {
        const user = await this.customerRepository.findOneBy({
            username,
            ...findOptions,
        })
        return user
    }
}
