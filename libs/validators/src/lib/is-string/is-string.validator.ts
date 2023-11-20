import { ValidationOptions, IsString as _IsString } from 'class-validator'

import { ValidateErrors } from '../validate-error'

export const IsString = (
    validationOptions?: ValidationOptions,
): PropertyDecorator =>
    _IsString({ ...validationOptions, message: ValidateErrors.IS_STRING })
