export type Width = `w-${StyleRange | Screen | Percentage}`
export type Height = `h-${StyleRange | Screen | Percentage}`
export type Margin = `${MarginDirection}-${StyleRange | 'auto'}`
export type Padding = `${PaddingDirection}-${StyleRange}`
export type BackgroundColor =
    | `bg-${ColorsType}-${ColorRange}`
    | 'bg-white'
    | 'bg-black'
export type HoverBackgroundColor = `hover:${BackgroundColor}`
export type HoverDarkBackgroundColor = `dark:hover:${BackgroundColor}`
export type DarkBackgroundColor = `dark:${BackgroundColor}`
export type TextColor =
    | `text-${ColorsType}-${ColorRange}`
    | 'text-white'
    | 'text-black'
export type HoverTextColor = `hover:${TextColor}`
export type DarkTextColor = `dark:${TextColor}`
export type HoverDarkTextColor = `dark:hover:${TextColor}`
export type TextSize = `text-${TextSizes}`
export type FontWeight = `font-${FontWeights}`
export type FontFamily = `font-${FontFamilies}`
export type Rounded =
    | `rounded-${BaseSizes | 'full' | 'none'}`
    | `rounded-${RoundedDirections}-${BaseSizes | 'full' | 'none'}`

export type BaseStyle = {
    className?: string
    width?: Width
    height?: Height
    margin?: Margin
    padding?: Padding
    backgroundColor?: BackgroundColor
    hoverBackgroundColor?: HoverBackgroundColor
    darkBackgroundColor?: DarkBackgroundColor
    hoverDarkBackgroundColor?: HoverDarkBackgroundColor
    textColor?: TextColor
    hoverTextColor?: HoverTextColor
    darkTextColor?: DarkTextColor
    hoverDarkTextColor?: HoverTextColor
    textSize?: TextSize
    fontWeight?: FontWeight
    fontFamily?: FontFamily
    rounded?: Rounded
}

type MarginDirection = 'm' | 'mx' | 'my' | 'mt' | 'mb' | 'ml' | 'mr'
type PaddingDirection = 'p' | 'px' | 'py' | 'pt' | 'pb' | 'pl' | 'pr'
type FontFamilies = 'sky' | 'tajawal' | 'poppins' | 'mono' | 'serif' | 'sans'
type FontWeights =
    | 'thin'
    | 'extralight'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'black'
type RoundedDirections = 't' | 'r' | 'l' | 'b' | 'tl' | 'tr' | 'br' | 'bl'
type BaseSizes = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
type TextSizes =
    | BaseSizes
    | 'xs'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl'
export type ColorsType =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'gray'
type ColorRange =
    | '50'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
type Screen = 'full' | 'fit' | 'min' | 'max' | 'screen' | 'auto'
type StyleRange =
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | '14'
    | '16'
    | '20'
    | '24'
    | '28'
    | '32'
    | '36'
    | '40'
    | '44'
    | '48'
    | '52'
    | '56'
    | '60'
    | '64'
    | '72'
    | '80'
    | '96'
    | 'px'
    | '0.5'
    | '1.5'
    | '2.5'
    | '3.5'
type Percentage =
    | '1/2'
    | '1/3'
    | '2/3'
    | '1/4'
    | '2/4'
    | '3/4'
    | '1/5'
    | '2/5'
    | '3/5'
    | '4/5'
    | '1/6'
    | '2/6'
    | '3/6'
    | '4/6'
    | '5/6'
    | '1/12'
    | '2/12'
    | '3/12'
    | '4/12'
    | '5/12'
    | '6/12'
    | '7/12'
    | '8/12'
    | '9/12'
    | '10/12'
    | '11/12'
