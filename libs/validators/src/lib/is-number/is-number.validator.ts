import {
    IsNumberOptions,
    ValidationOptions,
    IsNumber as _IsNumber,
} from 'class-validator'

import { ValidateErrors } from '../validate-error'

export const IsNumber = (
    options?: IsNumberOptions,
    validationOptions?: ValidationOptions,
): PropertyDecorator =>
    _IsNumber(options, {
        ...validationOptions,
        message: ValidateErrors.IS_NUMBER,
    })
