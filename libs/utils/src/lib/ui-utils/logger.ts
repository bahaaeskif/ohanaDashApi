import { DateFormat } from '../time.util'

export const Logger = (message: any, tag = '', with_date = false) => {
    if (typeof message === 'string')
        with_date
            ? console.log(
                  `${DateFormat()} ${
                      tag === '' ? '-' : `- ${tag} -`
                  } ${message}`,
              )
            : tag === ''
            ? console.log(message)
            : console.log(`${tag} - ${message}`)
    else console.log(message)
}
