import { ValidationOptions, IsEmail as _IsEmail } from 'class-validator'
import ValidatorJS from 'validator'

import { ValidateErrors } from '../validate-error'

export const IsEmail = (
    options?: ValidatorJS.IsEmailOptions,
    validationOptions?: ValidationOptions,
): PropertyDecorator =>
    _IsEmail(options, {
        ...validationOptions,
        message: ValidateErrors.IS_EMAIL,
    })
