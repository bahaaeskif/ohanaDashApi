import { BaseRequest } from './base'

export interface BasePostRequest<DataType> extends BaseRequest {
    data: DataType
}
