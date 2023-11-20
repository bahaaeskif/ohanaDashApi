import { useTranslation } from 'react-i18next'

import { Translations } from '@store/types'
import { ProfilePicture } from '@store/ui-core/assets'

export const DoctorInfo = () => {
    const { t } = useTranslation()
    return (
        <div className="bg-login hidden h-screen bg-cover sm:block sm:w-1/2 md:w-3/5">
            <div className="h-full p-3 lg:p-10">
                <div className="flex h-full flex-col items-center justify-center p-3 lg:p-14">
                    <div className="flex items-center justify-center sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <div className="w-full overflow-hidden rounded-3xl shadow-md">
                            <img
                                src={ProfilePicture}
                                alt="Doctor Image"
                                className=""
                            />
                        </div>
                    </div>
                    <div className="flex w-full flex-1 flex-col items-center justify-start gap-5 text-center sm:mt-5 lg:mt-0 lg:p-3">
                        <h1 className="text-secondary-500 text-3xl">
                            {t(Translations.EXAMPLE.DOCTOR_NAME)}
                        </h1>
                        <p className="w-full lg:w-3/4">
                            {t(Translations.EXAMPLE.DOCTOR_INFO)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
