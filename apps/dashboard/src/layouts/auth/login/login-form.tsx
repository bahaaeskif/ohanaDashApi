import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LoginDto } from '@store/dto'
import { IBaseUser, IErrors, Translations } from '@store/types'
import { Button, Copyright, Input } from '@store/ui-core/components'
import { useLoginMutation } from '@store/ui-core/hooks'
import { GetInputErrors } from '@store/utils/ui'

export const LoginForm = () => {
    const { t } = useTranslation()

    const { mutate, isLoading, error, isError } = useLoginMutation()

    const [loginData, setLoginData] = useState<LoginDto>({
        username: '',
        password: '',
    })

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target
        const id = target.id
        const value = target.value
        setLoginData({
            ...loginData,
            [id]: value,
        })
    }

    const sendData = () => mutate(loginData)

    return (
        <div className="my-shadow dark:bg-secondary-900 bg-secondary-100 flex h-screen w-full flex-1 items-center rounded-r-lg p-10 sm:w-1/2 md:w-2/5">
            <div className="m-auto w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
                <h1 className="text-primary-500 text-4xl font-bold uppercase dark:text-white">
                    {t(Translations.AUTH.LOGIN)}
                </h1>
                <div className="flex flex-col">
                    <Input
                        id="username"
                        onChange={onChange}
                        label={Translations.KEY.USERNAME}
                        fullWidth
                        onEnterPress={sendData}
                        errors={
                            isError &&
                            GetInputErrors<IBaseUser>(
                                error?.response?.data?.errors as IErrors[],
                                'username',
                            )
                        }
                    />
                    <Input
                        id="password"
                        type="password"
                        onChange={onChange}
                        label={Translations.KEY.PASSWORD}
                        fullWidth
                        onEnterPress={sendData}
                        errors={
                            isError &&
                            GetInputErrors<IBaseUser>(
                                error?.response?.data?.errors as IErrors[],
                                'password',
                            )
                        }
                    />
                    <Button
                        title={Translations.AUTH.LOGIN}
                        onClick={sendData}
                        className={`mt-5 mb-2`}
                        color="primary"
                        fullWidth
                        loading={isLoading}
                        disabled={isLoading}
                    />
                </div>
                <Copyright />
            </div>
        </div>
    )
}
