import { useTranslation } from 'react-i18next'

export const ShowMoreCard = ({
    title,
    detail,
}: {
    title: string
    detail: string
}) => {
    const { t } = useTranslation()

    return (
        <div className="show-more-card-container">
            <div className="show-more-card-details">
                <p className="text-2xl text-secondary-500">{t(title)}</p>
                <p className="text-2xl">{detail}</p>
            </div>
        </div>
    )
}
