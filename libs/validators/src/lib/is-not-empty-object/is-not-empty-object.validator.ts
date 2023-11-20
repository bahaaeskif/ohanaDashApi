import {
    ValidationOptions,
    IsNotEmptyObject as _IsNotEmptyObject,
} from 'class-validator'

import { ValidateErrors } from '../validate-error'

export const IsNotEmptyObject = (
    options?: { nullable?: boolean },
    validationOptions?: ValidationOptions,
): PropertyDecorator =>
    _IsNotEmptyObject(options, {
        ...validationOptions,
        message: ValidateErrors.IS_NOT_EMPTY_OBJECT,
    })
