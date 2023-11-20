import { useTranslation } from 'react-i18next'

import { Translations } from '@store/types'

import { RestoreModalProps } from '../../types'

export const RestoreModal = ({
    isOpen,
    closeFunction,
    restoreFunction,
}: RestoreModalProps) => {
    const { t } = useTranslation()

    return (
        isOpen && (
            <div className="dark:bg-dark fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center bg-white bg-opacity-50 p-5 dark:bg-opacity-50">
                <div className="dark:bg-secondary-700 flex h-max w-1/2 flex-col rounded-md bg-gray-50 px-2 py-5 shadow-md">
                    <div className="grow p-2">
                        <div className="mb-2 text-center">
                            <h1 className="cursor-auto select-none text-2xl dark:text-white">
                                {t(Translations.COMMON.RESTORE_MESSAGE)}
                            </h1>
                        </div>
                    </div>

                    <div className="flex">
                        <div
                            className="bg-error-500 hover:bg-error-600 m-2 w-full cursor-pointer rounded-xl p-2 text-center text-white shadow-xl"
                            onClick={closeFunction}
                        >
                            <h1 className="text-2xl">
                                {t(Translations.KEY.BACK)}
                            </h1>
                        </div>
                        <div
                            className="bg-success-500 hover:bg-success-600 m-2 w-full cursor-pointer rounded-xl p-2 text-center text-white shadow-xl"
                            onClick={restoreFunction}
                        >
                            <h1 className="text-2xl">
                                {t(Translations.KEY.RESTORE)}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}
