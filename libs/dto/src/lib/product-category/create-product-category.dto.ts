import {
    IsNotEmpty,
    IsNumber,
    IsString,
    Max,
    MaxLength,
    Min,
    ValidateNested,
} from '@store/validators'
import { Type } from 'class-transformer'

import { CreateAssetDto } from '../asset'

export class CreateProductCategoryDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    name_ar: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    name_en: string

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(1000000)
    order: number

    @IsNotEmpty()
    @Type(() => CreateAssetDto)
    @ValidateNested()
    asset: CreateAssetDto
}
