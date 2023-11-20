import { SvgProps } from '../../components'

export const LoaderSvg = ({
    className = 'stroke-white',
    height = 28,
    width = 28,
}: SvgProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{
                margin: 'auto',
                display: 'block',
                shapeRendering: 'auto',
            }}
            width={`${width}px`}
            height={`${height}px`}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
        >
            <circle
                cx="50"
                cy="50"
                fill="none"
                className={className}
                strokeWidth="10"
                r="35"
                strokeDasharray="164.93361431346415 56.97787143782138"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0 50 50;360 50 50"
                    keyTimes="0;1"
                ></animateTransform>
            </circle>
        </svg>
    )
}
