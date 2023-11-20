import { IErrors } from '../response'

export interface IErrorsResponse {
    errors: IErrors[] | string
    statusCode: number
}
