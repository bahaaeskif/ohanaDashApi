import { useTranslation } from 'react-i18next'

import { Translations } from '@store/types'

export const MainSettings = () => {
    const { t } = useTranslation()

    return (
        <>
            <title>{t(Translations.PAGES.SETTINGS)}</title>
            <div className="main-settings-container">Main Settings</div>
        </>
    )
}
