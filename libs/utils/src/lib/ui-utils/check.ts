import { Dir, Languages, Static, Themes } from '@store/types'

export const CheckTheme = () => {
    const html = document.documentElement.classList
    if (!localStorage.getItem(Static.THEME))
        localStorage.setItem(Static.THEME, Themes.LIGHT)
    if (localStorage.getItem(Static.THEME) === Themes.DARK)
        html.add(Themes.DARK)
    else html.remove(Themes.DARK)
}

export const CheckDirection = () => {
    const language = localStorage.getItem(Static.I18N_LNG)
    localStorage.setItem(
        Static.DIR,
        language === Languages.EN ? Dir.LTR : Dir.RTL,
    )
    document.documentElement.dir = localStorage.getItem(Static.DIR)!
}

export const CheckDataIfChange = (data: object, defaultObject: object) => {
    for (const key in data) {
        const value = data[key]
        const defaultValue = defaultObject[key]
        if (value !== defaultValue) return true
    }
    return false
}
