import { BaseRequest } from './base'

export interface BaseUpdateRequest<DataType> extends BaseRequest {
    data: DataType
}
