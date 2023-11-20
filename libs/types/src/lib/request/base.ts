import { AxiosRequestHeaders } from 'axios'

export interface BaseRequest {
    path: string
    headers?: Partial<AxiosRequestHeaders>
}
