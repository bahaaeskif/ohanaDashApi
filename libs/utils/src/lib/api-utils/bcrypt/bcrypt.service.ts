import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { compare, hash } from 'bcryptjs'

import { HttpException } from '@store/types'

@Injectable()
export class BcryptService {
    protected salt: string
    constructor(private configService: ConfigService) {
        this.salt = this.configService.getOrThrow('salt')
    }

    async hash(text: string): Promise<string> {
        const hashedText = await hash(text, +this.salt)
        return hashedText
    }

    async compare(text: string, hash: string): Promise<boolean> {
        const compared = await compare(text, hash)
        return compared
    }

    async checkUserPassword(text: string, hash: string): Promise<void> {
        const compare = await this.compare(text, hash)
        if (!compare) throw new BadRequestException(HttpException.WRONG_DETAILS)
    }
}
