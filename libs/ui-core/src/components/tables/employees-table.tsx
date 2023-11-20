import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { IEmployee, Languages, Translations, UserRole } from '@store/types'

import { TableSettings } from '../base'
import { TableProps } from '../types'
import { useAuth } from '../../hooks'

export const EmployeesTable = ({
    data,
    editNavigate,
    deleteRecord,
    showMoreNavigate,
    editPassword,
}: TableProps<IEmployee>) => {
    const { t, i18n } = useTranslation()

    const { user } = useAuth<IEmployee>()

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
                            {t(Translations.KEY.FIRST_NAME)}
                        </th>
                        <th className={thMainStyle}>
                            {t(Translations.KEY.LAST_NAME)}
                        </th>
                        <th className={thMainStyle}>
                            {t(Translations.KEY.USERNAME)}
                        </th>
                        <th className={thMainStyle}>
                            {t(Translations.KEY.ROLE)}
                        </th>
                        <th className={thMainStyle}>
                            {t(Translations.KEY.SETTINGS)}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((employee: IEmployee, index) => (
                        <tr key={index} className="body-tr-main-style">
                            <th className={tbMainStyle}>
                                {employee?.firstName}
                            </th>
                            <td className={tbMainStyle}>
                                {employee?.lastName}
                            </td>
                            <td className={tbMainStyle}>
                                {employee?.username}
                            </td>
                            <td className={tbMainStyle}>{employee?.role}</td>
                            <td className={tbMainStyle}>
                                <TableSettings
                                    showMoreNavigate={
                                        employee.role !== UserRole.ADMIN ||
                                        employee.id === user?.id
                                            ? () => showMoreNavigate(employee)
                                            : null
                                    }
                                    editNavigate={
                                        employee.role !== UserRole.ADMIN ||
                                        employee.id === user?.id
                                            ? () => editNavigate(employee)
                                            : null
                                    }
                                    deleteRecord={
                                        employee.role !== UserRole.ADMIN
                                            ? () => deleteRecord(employee.id)
                                            : null
                                    }
                                    editPassword={
                                        employee.role !== UserRole.ADMIN ||
                                        employee.id === user?.id
                                            ? () => editPassword(employee.id)
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
