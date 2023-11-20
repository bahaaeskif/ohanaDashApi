import { LoaderSvg } from '@store/ui-core/assets'

export const LoaderPage = () => {
    return (
        <div className="dark:bg-dark fixed top-0 right-0 flex h-screen w-screen items-center justify-center bg-white bg-opacity-5 dark:bg-opacity-25">
            <div className="mx-auto w-min">
                <LoaderSvg
                    className="stroke-primary-500"
                    height={250}
                    width={250}
                />
            </div>
        </div>
    )
}
