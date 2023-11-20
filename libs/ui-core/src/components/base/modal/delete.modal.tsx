import { useTranslation } from 'react-i18next'

import { Translations } from '@store/types'

import { DeleteModalProps } from '../../types'

export const DeleteModal = ({
    isOpen,
    closeFunction,
    deleteFunction,
}: DeleteModalProps) => {
    const { t } = useTranslation()

    return (
        isOpen && (
            <div className="dark:bg-dark fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center bg-white bg-opacity-50 p-5 dark:bg-opacity-50">
                <div className="dark:bg-secondary-700 flex h-max w-1/2 flex-col rounded-md bg-gray-50 px-2 py-5 shadow-md">
                    <div className="grow p-2">
                        <div className="mb-2 text-center">
                            <h1 className="cursor-auto select-none text-2xl dark:text-white">
                                {t(Translations.COMMON.DELETE_MESSAGE)}
                            </h1>
                        </div>
                    </div>

                    <div className="flex">
                        <div
                            className="m-2 w-full cursor-pointer rounded-xl bg-green-500 p-2 text-center text-white shadow-xl hover:bg-green-600"
                            onClick={closeFunction}
                        >
                            <h1 className="text-2xl">
                                {t(Translations.KEY.BACK)}
                            </h1>
                        </div>
                        <div
                            className="m-2 w-full cursor-pointer rounded-xl bg-red-500 p-2 text-center text-white shadow-xl hover:bg-red-600"
                            onClick={deleteFunction}
                        >
                            <h1 className="text-2xl">
                                {t(Translations.KEY.DELETE)}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}
