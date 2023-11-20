import { Injectable } from '@nestjs/common'
import {
    isUUID,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({ name: 'IsUUIDArray', async: true })
@Injectable()
export class UUIDArrayRole implements ValidatorConstraintInterface {
    constructor() {}

    async validate(value: string[]) {
        try {
            for (let i = 0; i < value.length; i++) {
                const item = value[i]
                const check = isUUID(item)
                if (!check) return false
            }
            return true
        } catch (e) {
            return false
        }

        return true
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} Should Be Array Of UUID`
    }
}
