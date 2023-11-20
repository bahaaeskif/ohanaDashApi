import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { OrderStatus, Translations } from '@store/types'

import { OrderStatusModalProps, SelectValue } from '../../types'
import { SelectDropdown } from '../select-dropdown'

const OrderStatusArray: SelectValue[] = Object.keys(OrderStatus)
    .map((oS) => {
        if (OrderStatus[oS] !== OrderStatus.CANCELED)
            return {
                label: OrderStatus[oS],
                value: oS,
            }
    })
    .filter((p) => p)

export const OrderStatusModal = ({
    isOpen,
    closeFunction,
    orderStatusFunction,
    prevStatus,
}: OrderStatusModalProps) => {
    const { t } = useTranslation()

    const [orderStatus, setStatus] = useState<SelectValue>(
        OrderStatusArray.find((oS) => oS.label === prevStatus),
    )

    const onChangeSelect = (e: SelectValue) => {
        setStatus(e)
    }

    useEffect(() => {
        setStatus(OrderStatusArray.find((oS) => oS.label === prevStatus))
    }, [prevStatus])

    return (
        isOpen && (
            <div className="dark:bg-dark fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center bg-white bg-opacity-50 p-5 dark:bg-opacity-50">
                <div className="dark:bg-secondary-700 flex h-max w-1/2 flex-col rounded-md bg-gray-50 px-2 py-5 shadow-md">
                    <div>
                        <SelectDropdown
                            id="productCategoryId"
                            onChange={onChangeSelect}
                            options={OrderStatusArray}
                            label={Translations.KEY.STATUS}
                            className="w-full px-3"
                            value={orderStatus}
                        />
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
                            onClick={() =>
                                orderStatusFunction(
                                    orderStatus.label as OrderStatus,
                                )
                            }
                        >
                            <h1 className="text-2xl">
                                {t(Translations.KEY.EDIT)}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}
