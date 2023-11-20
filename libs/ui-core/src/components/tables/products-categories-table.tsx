import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { IProductCategory, Languages, Translations } from '@store/types'

import { apiRootAtom } from '../../services/recoil/static'
import { LazyImage, TableSettings } from '../base'
import { TableProps } from '../types'

export const ProductsCategoriesTable = ({
    data,
    editNavigate,
    deleteRecord,
    showMoreNavigate,
    restoreItem,
}: TableProps<IProductCategory>) => {
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
                        <th className={thMainStyle}>
                            {t(Translations.KEY.NAME)}
                        </th>
                        <th className={thMainStyle}>
                            {t(Translations.KEY.ORDER)}
                        </th>
                        <th className={thMainStyle}>
                            {t(Translations.KEY.SETTINGS)}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((productCategory: IProductCategory, index) => (
                        <tr key={index} className="body-tr-main-style">
                            <td className={tbMainStyle}>
                                <div className="flex items-center">
                                    <LazyImage
                                        src={`${apiRoot}/${productCategory.asset.sizesUrls[360]}`}
                                        alt={
                                            i18n.language === Languages.AR
                                                ? productCategory.name_ar
                                                : productCategory.name_en
                                        }
                                    />
                                    {/* <div className="h-12 w-12 overflow-hidden rounded-full">
                                        <img
                                            src={`${rootApi}/${productCategory.asset.sizesUrls[360]}`}
                                            alt={productCategory.name}
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
                                            ? productCategory.name_ar
                                            : productCategory.name_en}{' '}
                                        {productCategory.deletedAt && (
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
                                {productCategory?.order}
                            </td>
                            <td className={tbMainStyle}>
                                <TableSettings
                                    restoreItem={
                                        productCategory.deletedAt
                                            ? () =>
                                                  restoreItem(
                                                      productCategory.id,
                                                  )
                                            : null
                                    }
                                    showMoreNavigate={() =>
                                        showMoreNavigate(productCategory)
                                    }
                                    editNavigate={
                                        !productCategory.deletedAt
                                            ? () =>
                                                  editNavigate(productCategory)
                                            : null
                                    }
                                    deleteRecord={
                                        !productCategory.deletedAt
                                            ? () =>
                                                  deleteRecord(
                                                      productCategory.id,
                                                  )
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
