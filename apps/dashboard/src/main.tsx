import 'moment/dist/locale/ar'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RecoilRoot } from 'recoil'

import { Languages, Static } from '@store/types'
import i18n from '@store/ui-core/i18n'

import App from './app'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const queryClient = new QueryClient()

root.render(
    <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
            <BrowserRouter>
                <RecoilRoot>
                    {/* <Notification /> */}
                    <ToastContainer
                        newestOnTop={true}
                        draggablePercent={50}
                        limit={5}
                        position={
                            localStorage.getItem(Static.I18N_LNG) ===
                            Languages.AR
                                ? 'top-right'
                                : 'top-left'
                        }
                        rtl={
                            localStorage.getItem(Static.I18N_LNG) ===
                            Languages.AR
                        }
                        theme="colored"
                        // hideProgressBar
                        closeButton={false}
                        icon={true}
                    />
                    <App />
                </RecoilRoot>
            </BrowserRouter>
        </I18nextProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-left" /> */}
    </QueryClientProvider>,
)
