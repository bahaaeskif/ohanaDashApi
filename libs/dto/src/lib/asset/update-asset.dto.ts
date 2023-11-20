import { PartialType } from '@nestjs/mapped-types'

import { CreateAssetDto } from './create-asset.dto'
import { IsNotEmpty, IsUUID } from '@store/validators'

export class UpdateAssetDto extends PartialType(CreateAssetDto) {
    @IsNotEmpty()
    @IsUUID()
    assetId: string
}
