import moment from 'moment'

import { Languages } from '@store/types'

export const DateFormat = (options?: {
    date?: any
    locale?: Languages
    format?: string
}) => {
    const { date, format, locale } = options
    const formattedDate = moment(date ?? new Date())
        .locale(locale ?? Languages.EN)
        .format(format ?? 'YYYY/MM/DD hh:mm:ss A')
    return formattedDate
}
