import { BullModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { IRedis } from '@store/types'

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
    constructor(private configService: ConfigService) {}

    createSharedConfiguration(): BullModuleOptions {
        const { host, port } = this.configService.get<IRedis>('redis')
        return { redis: { host, port } }
    }
}
