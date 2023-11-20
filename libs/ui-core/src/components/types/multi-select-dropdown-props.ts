import {
    ActionMeta,
    GroupBase,
    MultiValue,
    OptionsOrGroups,
} from 'react-select'

import { IErrors } from '@store/types'
import { BaseStyle } from './style'

export type OnChangeMultiSelectDropdown =
    | ((
          newValue: MultiValue<{
              value: string
              label: string
          }>,
          actionMeta: ActionMeta<{
              value: string
              label: string
          }>,
      ) => void)
    | undefined

export type MultiSelectValue<T = string> = MultiValue<{
    value: T
    label: string
}>

export type MultiOptionsGroup =
    | OptionsOrGroups<
          {
              value: string
              label: string
          },
          GroupBase<{
              value: string
              label: string
          }>
      >
    | undefined

export type MultiSelectDropdownProps = BaseStyle & {
    id: string
    label?: string
    onChange: OnChangeMultiSelectDropdown
    options: MultiOptionsGroup
    value?: MultiSelectValue<string>
    errors?: IErrors
}
