import {
    ValidationOptions,
    IsNumberString as _IsNumberString,
} from 'class-validator'
import ValidatorJS from 'validator'

import { ValidateErrors } from '../validate-error'

export const IsNumberString = (
    options?: ValidatorJS.IsNumericOptions,
    validationOptions?: ValidationOptions,
): PropertyDecorator =>
    _IsNumberString(options, {
        ...validationOptions,
        message: ValidateErrors.IS_NUMBER_STRING,
    })
