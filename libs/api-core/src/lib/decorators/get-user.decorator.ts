import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { Employee, Customer } from '../database'

type DataType = Employee | Customer

export const GetUser = <T extends DataType>(
    userData?: keyof T | (keyof T)[] | undefined,
) =>
    createParamDecorator<keyof T | (keyof T)[]>(
        (data = userData, ctx: ExecutionContext) => {
            const request = ctx.switchToHttp().getRequest()
            if (data) {
                if (typeof data === 'object') {
                    const newReq = {}
                    data.map((item: any) => (newReq[item] = request.user[item]))
                    return newReq
                } else return request.user[data]
            }
            return request.user
        },
    )()
