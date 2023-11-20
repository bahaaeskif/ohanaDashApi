import { ValidationOptions, IsNotEmpty as _IsNotEmpty } from 'class-validator'

import { ValidateErrors } from '../validate-error'

export const IsNotEmpty = (
    validationOptions?: ValidationOptions,
): PropertyDecorator =>
    _IsNotEmpty({ ...validationOptions, message: ValidateErrors.IS_NOT_EMPTY })
