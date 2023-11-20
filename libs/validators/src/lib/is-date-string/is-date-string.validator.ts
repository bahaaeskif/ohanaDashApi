import {
    ValidationOptions,
    IsDateString as _IsDateString,
} from 'class-validator'
import ValidatorJS from 'validator'

import { ValidateErrors } from '../validate-error'

export const IsDateString = (
    options?: ValidatorJS.IsISO8601Options,
    validationOptions?: ValidationOptions,
): PropertyDecorator =>
    _IsDateString(options, {
        ...validationOptions,
        message: ValidateErrors.IS_DATE_STRING,
    })
