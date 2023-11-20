import { IsArray, IsNotEmpty, IsString, IsUUID } from '@store/validators'

import { IOrderItem, OrderStatus } from '@store/types'

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsNotEmpty()
    @IsString()
    phone: string

    @IsNotEmpty()
    @IsString()
    notes: string

    @IsNotEmpty()
    @IsString()
    region: string

    @IsNotEmpty()
    @IsString()
    address: string

    @IsNotEmpty()
    @IsString()
    country: string

    @IsNotEmpty()
    @IsArray()
    @IsUUID('all', { each: true })
    productsIds: string[]

    totalPrice?: number
    status?: OrderStatus
    orderItems?: IOrderItem[]
}
