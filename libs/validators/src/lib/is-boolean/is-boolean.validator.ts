import { ValidationOptions, IsBoolean as _IsBoolean } from 'class-validator'

import { ValidateErrors } from '../validate-error'

export const IsBoolean = (
    validationOptions?: ValidationOptions,
): PropertyDecorator =>
    _IsBoolean({ ...validationOptions, message: ValidateErrors.IS_BOOLEAN })
