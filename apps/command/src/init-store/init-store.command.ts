import * as chalk from 'chalk'
import { Command, CommandRunner } from 'nest-commander'

@Command({
    name: 'initStore',
    options: { isDefault: false },
})
export class InitStoreCommand extends CommandRunner {
    constructor() {
        super()
    }

    async run(): Promise<void> {
        console.log('...Init Store Started...')
        console.log('...Init Store Successfully...')
    }
}
