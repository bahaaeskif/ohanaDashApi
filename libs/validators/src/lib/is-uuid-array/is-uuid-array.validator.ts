import { registerDecorator, ValidationOptions } from 'class-validator'

import { UUIDArrayRole } from './uuid-array.validator'

export function IsUUIDArray(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'IsUUIDArray',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: UUIDArrayRole,
        })
    }
}
