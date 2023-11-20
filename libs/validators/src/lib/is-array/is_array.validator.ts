import { ValidationOptions, IsArray as _IsArray } from 'class-validator'

import { ValidateErrors } from '../validate-error'

export const IsArray = (
    validationOptions?: ValidationOptions,
): PropertyDecorator =>
    _IsArray({ ...validationOptions, message: ValidateErrors.IS_ARRAY })
