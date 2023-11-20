import { useRecoilState } from 'recoil'

import { Static, Themes } from '@store/types'

import { themeAtom } from '../services/recoil'

export function useTheme() {
    const [theme, setTheme] = useRecoilState(themeAtom)

    const setDefaultTheme = () => {
        const html = document.documentElement.classList
        if (!localStorage.getItem(Static.THEME))
            localStorage.setItem(Static.THEME, Themes.LIGHT)
        if (localStorage.getItem(Static.THEME) === Themes.DARK)
            html.add(Themes.DARK)
        else html.remove(Themes.DARK)
    }

    const toggle = () => {
        const theme = localStorage.getItem(Static.THEME)
        if (theme === Themes.DARK) {
            document.documentElement.classList.remove(Themes.DARK)
            localStorage.setItem(Static.THEME, Themes.LIGHT)
            setTheme(Themes.LIGHT)
        } else {
            document.documentElement.classList.add(Themes.DARK)
            localStorage.setItem(Static.THEME, Themes.DARK)
            setTheme(Themes.DARK)
        }
    }

    return { setDefaultTheme, theme, toggle }
}
