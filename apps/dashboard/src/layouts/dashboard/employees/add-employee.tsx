import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { defaultEmployee } from '@store/constant'
import { CreateEmployeeDto } from '@store/dto'
import {
    BaseResponse,
    IEmployee,
    IErrors,
    IErrorsResponse,
    Translations,
    UserRole,
} from '@store/types'
import { addEmployeeApi } from '@store/ui-core/api'
import {
    Divider,
    Input,
    NavbarButtonSetting,
    SelectDropdown,
    SelectValue,
    Text,
} from '@store/ui-core/components'
import { navbarButtonPathAtom } from '@store/ui-core/recoil'
import { Toast } from '@store/ui-core/services'
import { CheckDataIfChange, GetInputErrors, join } from '@store/utils/ui'

export const AddEmployee = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { t } = useTranslation()
    const rolesOptions = [
        { value: UserRole.ADMIN, label: t(Translations.KEY.ADMIN) },
        { value: UserRole.EMPLOYEE, label: t(Translations.KEY.EMPLOYEE) },
    ]

    const [{ path }, setNavbarButtonPath] = useRecoilState(navbarButtonPathAtom)

    const [data, setData] = useState<CreateEmployeeDto>(defaultEmployee)
    const [errors, setErrors] = useState<IErrors[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const onChangeInput = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { id, value, type } = e.target
        setData((prev) => ({
            ...prev,
            [id]: type === 'number' ? +value : value,
        }))
    }

    const onChangeSelect = (e: SelectValue<UserRole>) => {
        setData((prev) => ({
            ...prev,
            role: e.value,
        }))
    }

    const next = (res: BaseResponse<IEmployee>) => {
        const message = t(Translations.COMMON.SUCCESS_ADD, {
            item: res.data.firstName,
        })
        Toast(message, 'success')
        setData(defaultEmployee)
        setErrors([])
        setLoading(false)
    }

    const Errors = (res: BaseResponse<IErrorsResponse>) => {
        if (typeof res.data.errors === 'string') Toast(res.data.errors, 'error')
        else setErrors(res.data.errors)
        setLoading(false)
    }

    const sendData = async () => {
        setLoading(true)
        const res = await addEmployeeApi(data)
        if (res.status >= 200 && res.status < 300) next(res)
        else Errors(res as any)
    }

    const back = () => {
        const paths = pathname.split('/')
        navigate(join(paths[1], paths[2]))
    }

    useEffect(() => {
        setNavbarButtonPath((prev) => {
            if (CheckDataIfChange(data, defaultEmployee))
                return {
                    ...prev,
                    title: NavbarButtonSetting.CONFIRM,
                    buttonFunction: sendData,
                    isLoading: loading,
                }
            else
                return {
                    ...prev,
                    title: NavbarButtonSetting.BACK,
                    buttonFunction: back,
                    isLoading: loading,
                }
        })
    }, [data, loading])

    useEffect(() => {
        const paths = pathname.split('/')
        setNavbarButtonPath({
            path: join(paths[1], paths[2]),
            title: NavbarButtonSetting.BACK,
            buttonFunction: back,
            isLoading: loading,
        })
    }, [])

    return (
        <>
            <title>{t(Translations.PAGES.ADD)}</title>
            <div className="add-container">
                <Text
                    text={Translations.COMMON.PERSONAL_INFORMATION}
                    size="text-3xl"
                    margin="m-3"
                    color="text-secondary-500"
                    withTranslation
                />
                <div className="flex flex-wrap">
                    <Input
                        id="firstName"
                        onChange={onChangeInput}
                        label={Translations.KEY.FIRST_NAME}
                        className="w-full px-3 md:w-1/2"
                        value={data.firstName}
                        errors={GetInputErrors<CreateEmployeeDto>(
                            errors,
                            'firstName',
                        )}
                        fullWidth
                    />
                    <Input
                        id="lastName"
                        onChange={onChangeInput}
                        label={Translations.KEY.LAST_NAME}
                        className="w-full px-3 md:w-1/2"
                        value={data.lastName}
                        errors={GetInputErrors<CreateEmployeeDto>(
                            errors,
                            'lastName',
                        )}
                        fullWidth
                    />
                </div>

                <Divider margin="mt-10" />

                <Text
                    text={Translations.COMMON.WORK_INFORMATION}
                    size="text-3xl"
                    margin="m-3"
                    color="text-secondary-500"
                    withTranslation
                />
                <div className="flex flex-wrap">
                    <Input
                        id="username"
                        onChange={onChangeInput}
                        label={Translations.KEY.USERNAME}
                        className="w-full px-3 md:w-1/2"
                        value={data.username}
                        errors={GetInputErrors<CreateEmployeeDto>(
                            errors,
                            'username',
                        )}
                        fullWidth
                    />
                    <SelectDropdown
                        id="role"
                        onChange={onChangeSelect}
                        options={rolesOptions}
                        label={Translations.KEY.ROLE}
                        value={{
                            value: data.role,
                            label: rolesOptions.find(
                                (pC) => pC['value'] === data.role,
                            )?.label,
                        }}
                        errors={GetInputErrors<CreateEmployeeDto>(
                            errors,
                            'role',
                        )}
                        className="w-full px-3 md:w-1/2"
                    />
                    <Input
                        id="password"
                        onChange={onChangeInput}
                        label={Translations.KEY.PASSWORD}
                        className="w-full px-3 md:w-1/2"
                        type="password"
                        value={data.password}
                        errors={GetInputErrors<CreateEmployeeDto>(
                            errors,
                            'password',
                        )}
                        fullWidth
                    />
                    <Input
                        id="passwordConfirm"
                        onChange={onChangeInput}
                        label={Translations.KEY.CONFIRM_PASSWORD}
                        className="w-full px-3 md:w-1/2"
                        type="password"
                        value={data.passwordConfirm}
                        errors={GetInputErrors<CreateEmployeeDto>(
                            errors,
                            'passwordConfirm',
                        )}
                        fullWidth
                    />
                </div>
            </div>
        </>
    )
}
