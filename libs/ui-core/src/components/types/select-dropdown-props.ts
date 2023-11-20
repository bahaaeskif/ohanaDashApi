import {
    ActionMeta,
    GroupBase,
    OptionsOrGroups,
    SingleValue,
} from 'react-select'

import { BaseStyle } from './style'
import { IErrors } from '@store/types'

export type OnChangeSelectDropdown =
    | ((
          newValue: SingleValue<{
              value: string
              label: string
          }>,
          actionMeta: ActionMeta<{
              value: string
              label: string
          }>,
      ) => void)
    | undefined

export type SelectValue<T = string> = SingleValue<{
    value: T
    label: string
}>

export type OptionsGroup =
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

export type SelectDropdownProps = BaseStyle & {
    id: string
    label?: string
    onChange: OnChangeSelectDropdown
    options: OptionsGroup
    value?: SelectValue<string>
    errors?: IErrors
}
