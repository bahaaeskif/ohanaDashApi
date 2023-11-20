import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { priceUnit } from '@store/constant'
import { IProduct, Languages, Translations } from '@store/types'

import { apiRootAtom } from '../../services/recoil'
import { LazyImage, TableSettings } from '../base'
import { TableProps } from '../types'

export const ProductTable = ({
    data,
    editNavigate,
    deleteRecord,
    showMoreNavigate,
    restoreItem,
}: TableProps<IProduct>) => {
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
                            {t(Translations.KEY.NAME)}
                        </th>
                        <th scope="col" className={thMainStyle}>
                            {t(Translations.KEY.PRICE)}
                        </th>
                        <th scope="col" className={thMainStyle}>
                            {t(Translations.KEY.CATEGORY)}
                        </th>
                        <th scope="col" className={thMainStyle}>
                            {t(Translations.KEY.SETTINGS)}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((product: IProduct, index) => (
                        <tr
                            key={index}
                            className={classNames('body-tr-main-style')}
                        >
                            <td className={tbMainStyle}>
                                <div className="flex items-center">
                                    <LazyImage
                                        src={`${apiRoot}/${product?.images[0]}`}
                                        alt={
                                            i18n.language === Languages.AR
                                                ? product.name_ar
                                                : product.name_en
                                        }
                                    />
                                    {/* <div className="h-12 w-12 overflow-hidden rounded-full">
                                        <img
                                            loading="lazy"
                                            src={`${rootApi}/${product.asset.sizesUrls[360]}`}
                                            alt={product.name}
                                            className="h-full object-cover"
                                        />
                                    </div> */}
                                    <span
                                        className={classNames(
                                            i18n.language === Languages.AR
                                                ? 'mr-3'
                                                : 'ml-3',
                                        )}
                                    >
                                        {i18n.language === Languages.AR
                                            ? product.name_ar
                                            : product.name_en}{' '}
                                        {product.deletedAt && (
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
                                {product.price}{' '}
                                {i18n.language === Languages.AR
                                    ? priceUnit.ar
                                    : priceUnit.en}
                            </td>
                            <td className={tbMainStyle}>
                                <p
                                    className={classNames(
                                        product.productCategory.deletedAt &&
                                            'text-error-500 underline underline-offset-2',
                                    )}
                                >
                                    {i18n.language === Languages.AR
                                        ? product.productCategory.name_ar
                                        : product.productCategory.name_en}
                                </p>
                            </td>
                            <td className={tbMainStyle}>
                                <TableSettings
                                    restoreItem={
                                        product.deletedAt
                                            ? () => restoreItem(product.id)
                                            : null
                                    }
                                    showMoreNavigate={() =>
                                        showMoreNavigate(product)
                                    }
                                    editNavigate={
                                        !product.deletedAt
                                            ? () => editNavigate(product)
                                            : null
                                    }
                                    deleteRecord={
                                        !product.deletedAt
                                            ? () => deleteRecord(product.id)
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
