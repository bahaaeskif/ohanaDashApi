import { Suspense, lazy, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { PageRoute, Translations } from '@store/types'
import { useAuth, useLanguage, useTheme } from '@store/ui-core/hooks'
import { currentPageAtom } from '@store/ui-core/recoil'
import { join } from '@store/utils/ui'

import { NotFound } from './pages'
import { PagesRoutes } from './routes'

const Auth = lazy(() => import('./routes/auth'))
const Dashboard = lazy(() => import('./routes/dashboard'))

const App: React.FC = () => {
    const { pathname } = useLocation()

    const { accessToken } = useAuth()
    const { initLanguage } = useLanguage()
    const { setDefaultTheme } = useTheme()

    const setCurrentPage = useSetRecoilState(currentPageAtom)

    useEffect(() => {
        const current = pathname.split('/')
        const currentPage = PagesRoutes.find((page) => page.path === current[2])
        const currentSubTitle = current[3]
            ? Translations.KEY[
                  current[3].toUpperCase().replace('-', '_') as
                      | 'ADD'
                      | 'EDIT'
                      | 'SHOW'
                      | 'EDIT_PASSWORD'
              ]
            : // `KEY.${current[3].toUpperCase()}`
              ''
        const currentRecordTitle = current[4]

        setCurrentPage((prev) => ({
            ...prev,
            id: currentPage?.id!,
            mainTitle: currentPage?.title!,
            subTitle: currentSubTitle,
            recordTitle: currentRecordTitle,
        }))
    }, [pathname])

    useEffect(() => {
        initLanguage()
        setDefaultTheme()
    }, [])

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Navigate
                        to={accessToken ? PageRoute.DASHBOARD : PageRoute.AUTH}
                    />
                }
            />
            <Route
                path={join(PageRoute.AUTH, '*')}
                element={<Suspense children={<Auth />} />}
            />
            {/* {!token && (
				<Route path={PagesRoutes.DASHBOARD} element={<NotFound />} />
			)} */}
            <Route
                path={join(PageRoute.DASHBOARD, '*')}
                element={<Suspense children={<Dashboard />} />}
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default App
