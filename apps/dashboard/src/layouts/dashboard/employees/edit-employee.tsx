import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { UpdateEmployeeDto } from '@store/dto'
import {
    BaseResponse,
    IEmployee,
    IErrors,
    IErrorsResponse,
    PageRoute,
    Translations,
    UserRole,
} from '@store/types'
import { updateEmployeeApi } from '@store/ui-core/api'
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

export const EditEmployee = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const { pathname, state } = useLocation()
    const rolesOptions = [
        { value: UserRole.ADMIN, label: t(Translations.KEY.ADMIN) },
        { value: UserRole.EMPLOYEE, label: t(Translations.KEY.EMPLOYEE) },
    ]

    const [{ path }, setNavbarButtonPath] = useRecoilState(navbarButtonPathAtom)

    const employee = state?.employee as IEmployee
    const [data, setData] = useState<UpdateEmployeeDto>(employee)
    const [errors, setErrors] = useState<IErrors[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const onChangeInput = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { id, value } = event.target
        const updateNestedObject = (obj, path, value) => {
            const [currentKey, ...rest] = path

            if (rest.length === 0) {
                return { ...obj, [currentKey]: value }
            }

            return {
                ...obj,
                [currentKey]: updateNestedObject(obj[currentKey], rest, value),
            }
        }

        const propertyPath = id.split('.')
        const updatedFormData = updateNestedObject(data, propertyPath, value)

        setData(updatedFormData)
    }

    const onChangeSelect = (e: SelectValue<UserRole>) => {
        setData((prev) => ({
            ...prev,
            role: e.value,
        }))
    }

    const next = (res: BaseResponse<IEmployee>) => {
        const message = t(Translations.COMMON.SUCCESS_MESSAGE)
        Toast(message, 'success')
        setLoading(false)
        navigate(path)
    }

    const Errors = (res: BaseResponse<IErrorsResponse>) => {
        if (typeof res.data.errors === 'string') Toast(res.data.errors, 'error')
        else setErrors(res.data.errors)
        setLoading(false)
    }

    const sendData = async () => {
        setLoading(true)
        const res = await updateEmployeeApi(employee.id, data)
        if (res.status >= 200 && res.status < 300) next(res)
        else Errors(res as any)
    }

    const back = () => {
        const paths = pathname.split('/')
        navigate(join(paths[1], paths[2]))
    }

    useEffect(() => {
        setNavbarButtonPath((prev) => {
            if (CheckDataIfChange(data, employee))
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

    if (!employee) navigate(join(PageRoute.NOT_FOUND))

    return (
        <>
            <title>{t(Translations.KEY.EDIT)}</title>
            <div className="add-container">
                <Text
                    text={Translations.COMMON.PERSONAL_INFORMATION}
                    size="text-3xl"
                    margin="m-2"
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
                        errors={GetInputErrors<UpdateEmployeeDto>(
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
                        errors={GetInputErrors<UpdateEmployeeDto>(
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
                        errors={GetInputErrors<UpdateEmployeeDto>(
                            errors,
                            'username',
                        )}
                        fullWidth
                    />
                    <SelectDropdown
                        id="productCategoryId"
                        onChange={onChangeSelect}
                        options={rolesOptions}
                        label={Translations.KEY.ROLE}
                        className="w-full px-3 md:w-1/2"
                        value={rolesOptions.find(
                            (role) => role.value === data.role,
                        )}
                        errors={GetInputErrors<UpdateEmployeeDto>(
                            errors,
                            'role',
                        )}
                    />
                </div>
            </div>
        </>
    )
}
