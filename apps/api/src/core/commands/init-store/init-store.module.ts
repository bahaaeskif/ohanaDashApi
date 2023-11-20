import { Module } from '@nestjs/common'

import { InitStoreCommand } from './init-store.command'

@Module({
    imports: [],
    providers: [InitStoreCommand],
})
export class InitStoreModule {}
