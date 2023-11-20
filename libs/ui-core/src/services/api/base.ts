import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import {
    BaseDeleteRequest,
    BaseGetRequest,
    BasePostRequest,
    BaseResponse,
    BaseUpdateRequest,
    Languages,
    Static,
} from '@store/types'

const apiUrl = process.env.API_URL

const client = axios.create({ baseURL: apiUrl })
export const request = <TData = any, TResponse = any>({
    ...options
}: AxiosRequestConfig<TData>): Promise<AxiosResponse<TResponse, any>> => {
    const Authorization = `Bearer ${localStorage.getItem(Static.ACCESS_TOKEN)}`
    const language = localStorage.getItem(Static.I18N_LNG)
    client.defaults.headers.common = {
        'accept-language': language,
        Authorization,
    }
    return client({ ...options })
}

export const config = () => {
    const accessToken = `Bearer ${localStorage.getItem(Static.ACCESS_TOKEN)}`
    const config: AxiosRequestConfig = {
        headers: {
            'accept-language': localStorage.getItem(
                Static.I18N_LNG,
            ) as Languages,
            Authorization: accessToken,
        },
    }
    return config
}

export const baseGetApi = async <MyResponse = BaseResponse>({
    path,
    headers,
}: BaseGetRequest): Promise<MyResponse> => {
    try {
        const response: MyResponse = await axios.get(`${apiUrl}/${path}`, {
            ...config(),
            ...headers,
        })
        return response
    } catch (error: any) {
        return error.response
    }
}

export const basePostApi = async <DataType, MyResponse = BaseResponse>({
    path,
    data,
    headers,
}: BasePostRequest<DataType>): Promise<MyResponse> => {
    try {
        const response: MyResponse = await axios.post(
            `${apiUrl}/${path}`,
            data,
            { ...config(), ...headers },
        )
        return response
    } catch (error: any) {
        return error.response
    }
}

export const baseUpdateApi = async <DataType, MyResponse = BaseResponse>({
    path,
    data,
    headers,
}: BaseUpdateRequest<DataType>): Promise<MyResponse> => {
    try {
        const response: MyResponse = await axios.put(
            `${apiUrl}/${path}`,
            data,
            { ...config(), ...headers },
        )
        return response
    } catch (error: any) {
        return error.response
    }
}

export const baseDeleteApi = async <MyResponse = BaseResponse>({
    path,
    headers,
}: BaseDeleteRequest): Promise<MyResponse> => {
    try {
        const response: MyResponse = await axios.delete(`${apiUrl}/${path}`, {
            ...config(),
            ...headers,
        })
        return response
    } catch (error: any) {
        return error.response
    }
}
