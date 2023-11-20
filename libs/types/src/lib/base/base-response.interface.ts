export interface BaseResponse<DataType = { message: string; error: string }> {
    data: DataType
    status: number
}
