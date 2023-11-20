import { IErrors } from '@store/types'

export const GetInputErrors = <
    Interface extends object,
    Nested extends Object = any,
>(
    errors: IErrors[],
    property: keyof Interface,
    nested?: keyof Nested,
) => {
    if (typeof errors !== 'object') return
    if (nested)
        return errors
            ?.find((error) => error.property === property)
            ?.children?.find(
                (childError: IErrors) => childError.property === nested,
            )
    return errors?.find((error) => error.property === property)
}
