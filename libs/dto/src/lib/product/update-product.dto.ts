import { OmitType, PartialType } from '@nestjs/mapped-types'

import { IsArray, IsOptional, IsString } from '@store/validators'

import { CreateProductDto } from './create-product.dto'

export class UpdateProductDto extends PartialType(
    OmitType(CreateProductDto, ['assets']),
) {
    // @IsOptional()
    // @IsArray()
    // @Type(() => UpdateAssetDto)
    // @ValidateNested()
    // assets?: UpdateAssetDto[]
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    assets?: string[]

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    deletedAssets: string[]
}
