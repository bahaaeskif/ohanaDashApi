import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { defaultUpdatePassword } from '@store/constant'
import { UpdatePasswordDto } from '@store/dto'
import {
    BaseResponse,
    IEmployee,
    IErrors,
    IErrorsResponse,
    PageRoute,
    Translations,
} from '@store/types'
import { updateEmployeePasswordApi } from '@store/ui-core/api'
import { Input, NavbarButtonSetting, Text } from '@store/ui-core/components'
import { navbarButtonPathAtom } from '@store/ui-core/recoil'
import { Toast } from '@store/ui-core/services'
import { CheckDataIfChange, GetInputErrors, join } from '@store/utils/ui'

export const EditPassword = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const { pathname, state } = useLocation()

    const [{ path }, setNavbarButtonPath] = useRecoilState(navbarButtonPathAtom)

    const employeeId = state?.employeeId
    const [data, setData] = useState<UpdatePasswordDto>()
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
        setErrors([])
        setLoading(true)
        const res = await updateEmployeePasswordApi(employeeId, data)
        if (res.status >= 200 && res.status < 300) next(res)
        else Errors(res as any)
    }

    const back = () => {
        const paths = pathname.split('/')
        navigate(join(paths[1], paths[2]))
    }

    useEffect(() => {
        setNavbarButtonPath((prev) => {
            if (CheckDataIfChange(data, defaultUpdatePassword))
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

    if (!employeeId) navigate(join(PageRoute.NOT_FOUND))

    return (
        <>
            <title>{t(Translations.KEY.EDIT)}</title>
            <div className="add-container">
                <Text
                    text={Translations.COMMON.PRIVATE_INFORMATION}
                    size="text-3xl"
                    margin="m-2"
                    color="text-secondary-500"
                    withTranslation
                />
                <div className="flex flex-wrap">
                    <Input
                        id="oldPassword"
                        onChange={onChangeInput}
                        label={Translations.KEY.OLD_PASSWORD}
                        className="w-full px-3"
                        type="password"
                        errors={GetInputErrors<UpdatePasswordDto>(
                            errors,
                            'oldPassword',
                        )}
                        fullWidth
                    />
                    <Input
                        id="newPassword"
                        onChange={onChangeInput}
                        label={Translations.KEY.NEW_PASSWORD}
                        className="w-full px-3 md:w-1/2"
                        type="password"
                        errors={GetInputErrors<UpdatePasswordDto>(
                            errors,
                            'newPassword',
                        )}
                        fullWidth
                    />
                    <Input
                        id="newPasswordConfirm"
                        onChange={onChangeInput}
                        label={Translations.KEY.CONFIRM_PASSWORD}
                        className="w-full px-3 md:w-1/2"
                        type="password"
                        errors={GetInputErrors<UpdatePasswordDto>(
                            errors,
                            'newPasswordConfirm',
                        )}
                        fullWidth
                    />
                </div>
            </div>
        </>
    )
}
