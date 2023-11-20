import { ValidationOptions, Min as _Min } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

import { ValidateErrors } from '../validate-error'

export const Min = (
    minValue: number,
    validationOptions?: ValidationOptions,
): PropertyDecorator =>
    _Min(minValue, {
        ...validationOptions,
        message: i18nValidationMessage(ValidateErrors.MIN as never, {
            num: minValue,
        }),
    })
