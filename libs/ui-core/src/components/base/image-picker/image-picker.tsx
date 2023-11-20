import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
// import { BsCardImage } from 'react-icons/bs'

import { Translations } from '@store/types'

export const ImagePicker = ({
    id,
    image,
    onChangeInfo,
    label,
    onClick,
    errors,
    style = `w-full`,
}) => {
    const { t } = useTranslation()
    const showErrors = () => {
        const lis = []
        for (const error in errors?.constraints) {
            const text = errors.constraints[error]
            lis.push(
                <li key={lis.length} className="text-error-500">
                    {text}
                </li>,
            )
        }
        return lis
    }
    return (
        <div className={`mx-auto overflow-hidden rounded-lg ` + style}>
            <div className="md:flex">
                <div className="w-full">
                    <label
                        htmlFor={id}
                        className={classNames(
                            'base-label',
                            label === 'fakeLabel' ? 'invisible' : '',
                        )}
                    >
                        {t(label)}
                    </label>
                    <div className="relative flex h-60 w-full items-center justify-center overflow-hidden rounded-xl bg-white hover:bg-opacity-75">
                        <div className="absolute">
                            {!image ? (
                                <div className="flex flex-col items-center">
                                    {/* <BsCardImage
                                        size={75}
                                        className="text-primary-500"
                                    /> */}
                                    <span className="text-primary-500 mt-2 block text-xl font-medium">
                                        {label}
                                    </span>
                                </div>
                            ) : (
                                <img
                                    src={image}
                                    className="w-fit rounded-lg"
                                    alt=""
                                />
                            )}
                        </div>
                        <input
                            type="file"
                            accept=".jpeg, .png, .jpg"
                            onChange={onChangeInfo}
                            className="h-full w-full opacity-0"
                            id={id}
                        />
                    </div>
                    <div
                        className=" bg-primary-400 hover:bg-primary-500 mx-auto mt-2 cursor-pointer rounded-xl text-center shadow-xl hover:shadow-md"
                        onClick={onClick}
                    >
                        <h1
                            id={id}
                            className="text-secondary-100 hover:text-secondary-200 w-full p-2 text-2xl font-medium"
                        >
                            {t(Translations.KEY.DELETE)}
                        </h1>
                    </div>
                </div>
                <div className="mt-1 p-1">{showErrors()}</div>
            </div>
        </div>
    )
}
