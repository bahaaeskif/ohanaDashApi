import classNames from 'classnames'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { PageRoute, Themes } from '@store/types'
import { Copyright } from '@store/ui-core/components'
import { themeAtom } from '@store/ui-core/recoil'
import { join } from '@store/utils/ui'

import { Navbar, Sidebar } from '../layouts'
import { Employees, Products, ProductsCategories, Settings } from '../pages'
import { Orders } from '../pages/dashboard/orders'

const Dashboard = () => {
    const theme = useRecoilValue(themeAtom)

    return (
        <div
            className={classNames(
                'relative flex h-screen bg-cover',
                // theme === Themes.LIGHT
                //     ? 'bg-dashboardLight'
                //     : 'bg-dashboardBlack',
            )}
        >
            <div className="absolute z-0 h-screen w-screen blur-sm">
                <img
                    src={
                        theme === Themes.DARK
                            ? '/pattern-dark-2.png'
                            : '/pattern-light-2.png'
                    }
                    alt=""
                    className="h-full w-full object-cover"
                />
            </div>
            <Sidebar />
            <div className={classNames('z-10 flex-1 overflow-hidden')}>
                <Navbar />
                <div
                    className={classNames(
                        'flex h-full w-full flex-col items-center justify-between pt-[76px]',
                    )}
                >
                    <div
                        className={classNames(
                            'base-scroll h-full w-full flex-1 p-3',
                        )}
                    >
                        <Routes>
                            <Route
                                path={join(PageRoute.EMPLOYEES, '*')}
                                element={<Employees />}
                            />
                            <Route
                                path={join(PageRoute.PRODUCTS_CATEGORIES, '*')}
                                element={<ProductsCategories />}
                            />
                            <Route
                                path={join(PageRoute.PRODUCTS, '*')}
                                element={<Products />}
                            />
                            {/* <Route
                                path={join(PageRoute.SETTINGS, '*')}
                                element={<Settings />}
                            /> */}
                            <Route
                                path={join(PageRoute.ORDERS, '*')}
                                element={<Orders />}
                            />
                            <Route
                                path="/"
                                element={<Navigate to={PageRoute.EMPLOYEES} />}
                            />
                            <Route
                                path="*"
                                element={
                                    <Navigate to={join(PageRoute.NOT_FOUND)} />
                                }
                            />
                        </Routes>
                    </div>
                    <Copyright />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
