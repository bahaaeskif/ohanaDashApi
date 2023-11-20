import { CommandFactory } from 'nest-commander'
import { CommandsModule } from './core/commands/commands.module'

async function bootstrap() {
    await CommandFactory.run(CommandsModule, ['warn', 'error'])
}

bootstrap()
