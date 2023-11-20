import { ValidationOptions, Matches as _Matches } from 'class-validator'

import { ValidateErrors } from '../validate-error'

export const Matches = (
    pattern: RegExp,
    validationOptions?: ValidationOptions,
): PropertyDecorator =>
    _Matches(pattern, {
        ...validationOptions,
        message: ValidateErrors.MATCHES,
    })
