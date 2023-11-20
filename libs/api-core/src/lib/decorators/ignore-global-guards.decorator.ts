import { SetMetadata } from '@nestjs/common'

import { IGNORE_GLOBAL_GUARDS } from '@store/constant'

export const IgnoreGlobalGuardsDecorator = () =>
    SetMetadata(IGNORE_GLOBAL_GUARDS, true)
