import { OrderStatus } from '@store/types'
import { IsEnum, IsNotEmpty } from '@store/validators'

export class UpdateOrderStatusDto {
    @IsNotEmpty()
    @IsEnum(OrderStatus)
    status: OrderStatus
}
