import { ValidationOptions, Max as _Max } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

import { ValidateErrors } from '../validate-error'

export const Max = (
    maxValue: number,
    validationOptions?: ValidationOptions,
): PropertyDecorator =>
    _Max(maxValue, {
        ...validationOptions,
        message: i18nValidationMessage(ValidateErrors.MAX as never, {
            num: maxValue,
        }),
    })
