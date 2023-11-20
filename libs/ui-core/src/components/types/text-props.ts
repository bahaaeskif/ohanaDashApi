import {
    DarkTextColor,
    FontFamily,
    FontWeight,
    Margin,
    Padding,
    TextColor,
    TextSize,
} from './style'

export type TextProps = {
    text: string
    size?: TextSize
    color?: TextColor
    darkColor?: DarkTextColor
    weight?: FontWeight
    margin?: Margin
    padding?: Padding
    fontFamily?: FontFamily
    className?: string
    withTranslation?: boolean
}
