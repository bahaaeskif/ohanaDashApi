import { IsNumber, IsOptional, IsString, Max, Min } from '@store/validators'

export class CreateAssetDto {
    @IsOptional()
    @IsString()
    title: string

    @IsNumber()
    @Min(0)
    @Max(10)
    order: number

    @IsString()
    url: string

    productId?: string
}
