import {
    BackgroundColor,
    DarkBackgroundColor,
    Height,
    Margin,
    Rounded,
    Width,
} from './style'

export type DividerProps = {
    color?: BackgroundColor
    darkColor?: DarkBackgroundColor
    margin?: Margin
    height?: Height
    width?: Width
    rounded?: Rounded
    className?: string
}
