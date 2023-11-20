import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { RecoilState, useRecoilState } from 'recoil'

import {
    ICustomer,
    IEmployee,
    LoginResponse,
    PageRoute,
    Static,
} from '@store/types'
import { join } from '@store/utils/ui'

import {
    accessTokenAtom,
    currentUserAtom,
    refreshTokenAtom,
} from '../services/recoil/static'

export const useAuth = <UserType extends IEmployee | ICustomer>() => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const [user, setUser] = useRecoilState(
        currentUserAtom as RecoilState<UserType>,
    )
    const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom)
    const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenAtom)

    const login = (data: LoginResponse<UserType>) => {
        const { user, accessToken, refreshToken } = data
        setUser(user)
        setAccessToken(accessToken)
        setRefreshToken(refreshToken)
        localStorage.setItem(Static.CURRENT_USER, JSON.stringify(user))
        localStorage.setItem(Static.ACCESS_TOKEN, accessToken)
        localStorage.setItem(Static.REFRESH_TOKEN, refreshToken)
    }

    const logout = () => {
        setUser(null)
        setAccessToken(null)
        setRefreshToken(null)
        localStorage.removeItem(Static.CURRENT_USER)
        localStorage.removeItem(Static.ACCESS_TOKEN)
        localStorage.removeItem(Static.REFRESH_TOKEN)
        queryClient.clear()
        navigate(join(PageRoute.AUTH))
    }

    return { login, logout, user, accessToken, refreshToken }
}
