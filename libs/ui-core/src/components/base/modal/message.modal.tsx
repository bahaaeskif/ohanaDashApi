import { Translations } from '@store/types'

import { SuccessModalProps } from '../../types'
import { Button } from '../button'

export function MessageModal({
    isOpen,
    closeFunction,
    message,
}: SuccessModalProps) {
    return (
        isOpen && (
            <div className="fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center bg-white bg-opacity-50 dark:bg-black dark:bg-opacity-50">
                <div className="flex h-fit w-3/4 flex-col rounded-md bg-gray-50 p-3 shadow-md md:w-1/2 xl:w-1/3">
                    <div className="grow p-2">
                        <div className="mb-2 text-center">
                            <h1 className="cursor-auto select-none text-2xl">
                                {message}
                            </h1>
                        </div>
                    </div>
                    <div className="flex">
                        <Button
                            title={Translations.COMMON.CLOSE}
                            className="mx-auto !w-1/2"
                            onClick={() => closeFunction()}
                            color="success"
                            // fullWidth
                        />
                    </div>
                </div>
            </div>
        )
    )
}
