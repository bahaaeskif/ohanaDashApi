import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'

import { BullConfigService } from './queue-config.service'

@Module({
    imports: [
        BullModule.forRootAsync({
            useClass: BullConfigService,
        }),
    ],
    providers: [],
})
export class QueueModule {}
