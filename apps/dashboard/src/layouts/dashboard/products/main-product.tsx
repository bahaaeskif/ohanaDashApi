import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { IProduct, PageRoute } from '@store/types'
import { deleteProductApi, restoreProductApi } from '@store/ui-core/api'
import {
    DeleteModal,
    LoaderPage,
    NavbarButtonSetting,
    NoData,
    ProductTable,
    RestoreModal,
} from '@store/ui-core/components'
import { useModal, useProductsQuery } from '@store/ui-core/hooks'
import { currentPageAtom, navbarButtonPathAtom } from '@store/ui-core/recoil'
import { join } from '@store/utils/ui'

export const MainProduct = () => {
    const { data, isLoading, refetch } = useProductsQuery()
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

    const addRecord = () => navigate(PageRoute.ADD)

    const editRecord = (product: IProduct) => {
        setNavbarButtonPath({
            path: pathname,
            title: NavbarButtonSetting.CONFIRM,
            isLoading,
        })
        setCurrentPage((prev) => ({
            ...prev,
            recordTitle: product.id,
        }))
        navigate(join(false, PageRoute.EDIT, product.id), {
            state: {
                product: product,
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
        const res = await deleteProductApi(recordIdToDelete)
        toggleDelete(false)
        await refetch()
    }

    const restoreRecord = async () => {
        const res = await restoreProductApi(recordIdToRestore)
        toggleRestore(false)
        await refetch()
    }

    const showMoreRecord = (product: IProduct) => {
        setNavbarButtonPath({
            path: pathname,
            title: NavbarButtonSetting.BACK,
            isLoading,
        })
        setCurrentPage((prev) => ({
            ...prev,
            recordTitle: product.id,
        }))
        navigate(join(false, PageRoute.SHOW, product.id), {
            state: {
                product: product,
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
            <ProductTable
                data={data.data}
                editNavigate={editRecord}
                deleteRecord={showDeleteModal}
                showMoreNavigate={showMoreRecord}
                restoreItem={showRestoreModal}
            />
        </div>
    )
}
