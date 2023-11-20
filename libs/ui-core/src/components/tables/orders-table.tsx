import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { priceUnit } from '@store/constant'
import { IOrder, Languages, Translations } from '@store/types'

import { apiRootAtom } from '../../services/recoil'
import { TableSettings } from '../base'
import { TableProps } from '../types'

export const OrdersTable = ({
    data,
    editNavigate,
    deleteRecord,
    showMoreNavigate,
    restoreItem,
}: TableProps<IOrder>) => {
    const { t, i18n } = useTranslation()

    const apiRoot = useRecoilValue(apiRootAtom)

    const thMainStyle = classNames(
        'th-main-style',
        i18n.language === Languages.AR ? 'text-right' : 'text-left',
    )

    const tbMainStyle = classNames(
        'tb-main-style',
        i18n.language === Languages.AR ? 'text-right' : 'text-left',
    )

    return (
        <div className="table-container">
            <table className="table-main-style">
                <thead>
                    <tr className="head-tr-main-style">
                        <th scope="col" className={thMainStyle}>
                            {t(Translations.KEY.UUID)}
                        </th>
                        <th scope="col" className={thMainStyle}>
                            {t(Translations.KEY.EMAIL)}
                        </th>
                        <th scope="col" className={thMainStyle}>
                            {t(Translations.KEY.PRICE)}
                        </th>
                        <th scope="col" className={thMainStyle}>
                            {t(Translations.KEY.REGION)}
                        </th>
                        <th scope="col" className={thMainStyle}>
                            {t(Translations.KEY.STATUS)}
                        </th>
                        <th scope="col" className={thMainStyle}>
                            {t(Translations.KEY.SETTINGS)}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((order: IOrder, index) => (
                        <tr
                            key={index}
                            className={classNames('body-tr-main-style')}
                        >
                            <td className={tbMainStyle}>{order.id}</td>
                            <td className={tbMainStyle}>
                                <div className="flex items-center">
                                    <span
                                        className={classNames(
                                            i18n.language === Languages.AR
                                                ? 'mr-3'
                                                : 'ml-3',
                                        )}
                                    >
                                        {order.email}
                                        {order.deletedAt && (
                                            <>
                                                / <abbr />
                                                <span
                                                    className={classNames(
                                                        'text-error-500 underline underline-offset-2',
                                                    )}
                                                >
                                                    {t(
                                                        Translations.KEY
                                                            .DELETED,
                                                    )}
                                                </span>
                                            </>
                                        )}
                                    </span>
                                </div>
                            </td>
                            <td className={tbMainStyle}>
                                {order.totalPrice}{' '}
                                {i18n.language === Languages.AR
                                    ? priceUnit.ar
                                    : priceUnit.en}
                            </td>
                            <td className={tbMainStyle}>
                                <p>{order.region}</p>
                            </td>
                            <td className={tbMainStyle}>
                                <p>{order.status}</p>
                            </td>
                            <td className={tbMainStyle}>
                                <TableSettings
                                    // restoreItem={
                                    //     order.deletedAt
                                    //         ? () => restoreItem(order.id)
                                    //         : null
                                    // }
                                    showMoreNavigate={() =>
                                        showMoreNavigate(order)
                                    }
                                    editNavigate={
                                        !order.deletedAt
                                            ? () => editNavigate(order)
                                            : null
                                    }
                                    deleteRecord={
                                        !order.deletedAt
                                            ? () => deleteRecord(order.id)
                                            : null
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
