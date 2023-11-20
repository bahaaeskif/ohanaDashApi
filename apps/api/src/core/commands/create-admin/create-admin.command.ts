import chalk from 'chalk'
import { Command, CommandRunner, InquirerService } from 'nest-commander'
import { EntityManager } from 'typeorm'

import { Employee } from '@store/api-core/database'
import { CreateEmployeeDto } from '@store/dto'
import { UserRole } from '@store/types'
import { BcryptService } from '@store/utils/api'

@Command({
    name: 'createAdmin',
    options: { isDefault: false },
})
export class CreateAdminCommand extends CommandRunner {
    constructor(
        private inquirer: InquirerService,
        private entityManager: EntityManager,
        private bcryptService: BcryptService,
    ) {
        super()
    }

    get userRepository() {
        return this.entityManager.getRepository(Employee)
    }

    async run(): Promise<void> {
        console.log(chalk.yellow('...Create Admin Started...'))
        const data = await this.inquirer.ask<CreateEmployeeDto>(
            'create-admin',
            undefined,
        )

        const checkUsernameExist = await this.userRepository.findOneBy({
            username: data.username,
        })
        if (checkUsernameExist) {
            console.log(chalk.red('...Username Already Exist...'))
            return
        }

        data.password = await this.bcryptService.hash(data.password)

        try {
            let admin = this.userRepository.create({
                ...data,
                role: UserRole.ADMIN,
            })
            admin = await this.userRepository.save(admin)
        } catch (error) {
            console.log(
                '🚀 ~ file: create-admin.command.ts:53 ~ CreateAdminCommand ~ run ~ error:',
                error,
            )
        }

        console.log(chalk.green('...Admin Created Successfully...'))
    }
}
