import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { IProductCategory, PageRoute } from '@store/types'
import {
    deleteProductCategoryApi,
    restoreProductCategoryApi,
} from '@store/ui-core/api'
import {
    DeleteModal,
    LoaderPage,
    NavbarButtonSetting,
    NoData,
    ProductsCategoriesTable,
    RestoreModal,
} from '@store/ui-core/components'
import { useModal, useProductCategoriesQuery } from '@store/ui-core/hooks'
import { currentPageAtom, navbarButtonPathAtom } from '@store/ui-core/recoil'
import { join } from '@store/utils/ui'

export const MainProductCategory = () => {
    const { data, isLoading, refetch } = useProductCategoriesQuery()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const setCurrentPage = useSetRecoilState(currentPageAtom)
    const setNavbarButtonPath = useSetRecoilState(navbarButtonPathAtom)

    const {
        isOpen: deleteIsOpen,
        toggle: toggleDelete,
        state: recordIdToDelete,
        setState: setRecordIdToDelete,
    } = useModal<string>(null)
    const {
        isOpen: restoreIsOpen,
        toggle: toggleRestore,
        state: recordIdToRestore,
        setState: setRecordIdToRestore,
    } = useModal<string>(null)

    const addRecord = () => {
        navigate(PageRoute.ADD)
    }

    const editRecord = (productCategory: IProductCategory) => {
        setNavbarButtonPath({
            path: pathname,
            title: NavbarButtonSetting.CONFIRM,
            isLoading,
        })
        setCurrentPage((prev) => ({
            ...prev,
            recordTitle: productCategory.id,
        }))
        navigate(join(false, PageRoute.EDIT, productCategory.id), {
            state: {
                productCategory: productCategory,
            },
        })
    }

    const showDeleteModal = (recordId: string) => {
        toggleDelete(true)
        setRecordIdToDelete(recordId)
    }

    const showRestoreModal = (recordId: string) => {
        toggleRestore(true)
        setRecordIdToRestore(recordId)
    }

    const deleteRecord = async () => {
        if (recordIdToDelete) {
            const res = await deleteProductCategoryApi(recordIdToDelete)
            toggleDelete(false)
            await refetch()
        }
    }

    const restoreRecord = async () => {
        const res = await restoreProductCategoryApi(recordIdToRestore)
        toggleRestore(false)
        await refetch()
    }

    const showMoreRecord = (productCategory: IProductCategory) => {
        setNavbarButtonPath({
            path: pathname,
            title: NavbarButtonSetting.BACK,
            isLoading,
        })
        setCurrentPage((prev) => ({
            ...prev,
            recordTitle: productCategory.id,
        }))
        navigate(join(false, PageRoute.SHOW, productCategory.id), {
            state: {
                productCategory: productCategory,
            },
        })
    }

    useEffect(() => {
        setNavbarButtonPath({
            path: isLoading ? null : join(false, pathname, PageRoute.ADD),
            title: NavbarButtonSetting.ADD,
            buttonFunction: addRecord,
            isLoading,
        })
    }, [isLoading])

    if (isLoading) return <LoaderPage />

    if (!data?.data?.length) return <NoData />

    return (
        <div className="">
            <DeleteModal
                isOpen={deleteIsOpen}
                toggle={toggleDelete}
                closeFunction={() => toggleDelete()}
                deleteFunction={async () => await deleteRecord()}
            />
            <RestoreModal
                isOpen={restoreIsOpen}
                toggle={toggleRestore}
                closeFunction={() => toggleRestore()}
                restoreFunction={async () => await restoreRecord()}
            />
            <ProductsCategoriesTable
                data={data.data}
                editNavigate={editRecord}
                deleteRecord={showDeleteModal}
                showMoreNavigate={showMoreRecord}
                restoreItem={showRestoreModal}
            />
        </div>
    )
}
