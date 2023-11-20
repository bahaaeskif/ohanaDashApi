import { Transform } from 'class-transformer'

import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsUUID,
    Max,
    MaxLength,
    Min,
} from '@store/validators'

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    name_ar: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    name_en: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    model: string

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(1000000)
    @Transform((params) => +params.value)
    price: number

    @IsNotEmpty()
    @IsString()
    details_ar: string

    @IsNotEmpty()
    @IsString()
    details_en: string

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    sizes: string[]

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    colors: string[]

    @IsNotEmpty()
    @IsUUID()
    productCategoryId: string

    @IsNotEmpty()
    @IsString({ each: true })
    assets: string[]

    // @IsNotEmpty()
    // @IsArray()
    // @ValidateNested()
    // @Type(() => CreateAssetDto)
    // assets: CreateAssetDto[]
}
