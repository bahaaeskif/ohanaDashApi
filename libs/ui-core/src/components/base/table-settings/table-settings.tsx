import classNames from 'classnames'

import {
    DeleteSvg,
    EditSvg,
    LockSvg,
    RestoreSvg,
    ShowMoreSvg,
} from '../../../assets'

export type TableSettingsProps = {
    showMoreNavigate?: () => void
    editNavigate?: () => void
    deleteRecord?: () => void
    editPassword?: () => void
    restoreItem?: () => void
}

export const TableSettings = ({
    deleteRecord,
    editNavigate,
    showMoreNavigate,
    editPassword,
    restoreItem,
}: TableSettingsProps) => (
    <div className="flex justify-center">
        <div
            className={classNames(
                'group mx-3 w-[25px] cursor-pointer',
                !Boolean(restoreItem) && 'invisible',
            )}
            onClick={restoreItem}
        >
            <RestoreSvg
                className={classNames(
                    'fill-success-700 group-hover:fill-success-900 dark:fill-success-200 dark:group-hover:fill-success-400 h-fit w-7 !duration-100',
                )}
            />
        </div>

        <div
            className={classNames(
                'group mx-3 w-[25px] cursor-pointer',
                !Boolean(editPassword) && 'invisible',
            )}
            onClick={editPassword}
        >
            <LockSvg
                className={classNames(
                    'fill-warning-700 group-hover:fill-warning-900 dark:fill-warning-200 dark:group-hover:fill-warning-400 h-fit w-7 !duration-100',
                )}
            />
        </div>

        <div
            className={classNames(
                'group mx-3 w-[25px] cursor-pointer',
                !Boolean(deleteRecord) && 'invisible',
            )}
            onClick={deleteRecord}
        >
            <DeleteSvg
                className={classNames(
                    'fill-error-700 group-hover:fill-error-900 h-fit w-7 !duration-100',
                )}
            />
        </div>

        <div
            className={classNames(
                'group mx-3 w-[25px] cursor-pointer',
                !Boolean(editNavigate) && 'invisible',
            )}
            onClick={editNavigate}
        >
            <EditSvg
                className={classNames(
                    'fill-success-700 group-hover:fill-success-900 h-fit w-7 !duration-100',
                )}
            />
        </div>

        <div
            className={classNames(
                'group mx-3 w-[25px] cursor-pointer',
                !Boolean(showMoreNavigate) && 'invisible',
            )}
            onClick={showMoreNavigate}
        >
            <ShowMoreSvg
                className={classNames(
                    'fill-secondary-700 group-hover:fill-secondary-900 dark:fill-secondary-200 dark:group-hover:fill-secondary-400 h-fit w-7 !duration-100 ',
                )}
            />
        </div>
    </div>
)
