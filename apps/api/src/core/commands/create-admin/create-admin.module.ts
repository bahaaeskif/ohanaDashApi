import { Module } from '@nestjs/common'

import { BcryptModule } from '@store/utils/api'

import { CreateAdminCommand } from './create-admin.command'
import { CreateAdminQuestions } from './create-admin.questions'

@Module({
    imports: [BcryptModule],
    providers: [CreateAdminCommand, CreateAdminQuestions],
})
export class CreateAdminModule {}
