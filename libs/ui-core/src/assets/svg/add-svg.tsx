import { SvgProps } from '../../components'

export const AddSvg = ({ className }: SvgProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Outline"
            className={className}
            viewBox="0 0 24 24"
            width="512"
            height="512"
        >
            <path d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z" />
        </svg>
    )
}
