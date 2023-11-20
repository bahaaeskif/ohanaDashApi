import {
    LazyLoadImage,
    LazyLoadImageProps,
} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

export const LazyImage = ({ src, alt, ...props }: LazyLoadImageProps) => {
    return (
        <LazyLoadImage
            className="h-full rounded-full object-cover"
            loading="lazy"
            effect="blur"
            width={45}
            height={45}
            src={src}
            alt={alt}
            {...props}
        />
    )
}
