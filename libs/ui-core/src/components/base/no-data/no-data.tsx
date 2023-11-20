import { Translations } from '@store/types'
import { useTranslation } from 'react-i18next'

export const NoData = () => {
    const { t } = useTranslation()

    return (
        <div className="base-scroll flex h-full w-full flex-1 items-center justify-center">
            <div className="dark:bg-secondary-800 bg-secondary-200 flex flex-col items-center justify-center rounded-lg p-5 shadow-xl dark:bg-opacity-95">
                <img src="/inbox.png" alt="No Data" className="mb-10 w-52" />
                <h1 className="text-secondary-500 text-3xl dark:text-white">
                    {t(Translations.COMMON.NO_DATA_TO_SHOW)}
                </h1>
            </div>
        </div>
    )
}
