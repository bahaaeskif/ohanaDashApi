import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { IOrder, OrderStatus, PageRoute } from '@store/types'
import { deleteOrderApi, updateOrderStatusApi } from '@store/ui-core/api'
import {
    DeleteModal,
    LoaderPage,
    NavbarButtonSetting,
    NoData,
    OrderStatusModal,
    OrdersTable,
} from '@store/ui-core/components'
import { useModal, useOrdersQuery } from '@store/ui-core/hooks'
import { currentPageAtom, navbarButtonPathAtom } from '@store/ui-core/recoil'
import { join } from '@store/utils/ui'

export const MainOrder = () => {
    const { data, isLoading, refetch } = useOrdersQuery()
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
    const {
        isOpen: orderStatusIsOpen,
        toggle: toggleOrderStatus,
        state: recordToOrderStatus,
        setState: setRecordToOrderStatus,
    } = useModal<IOrder>(null)

    const addRecord = () => navigate(PageRoute.ADD)

    const editRecord = (order: IOrder) => {
        toggleOrderStatus(true)
        setRecordToOrderStatus(order)
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
        const res = await deleteOrderApi(recordIdToDelete)
        toggleDelete(false)
        await refetch()
    }

    const orderStatusUpdateRecord = async (orderStatus: OrderStatus) => {
        const res = await updateOrderStatusApi(recordToOrderStatus.id, {
            status: orderStatus,
        })
        toggleOrderStatus(false)
        await refetch()
    }

    const showMoreRecord = (product: IOrder) => {
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
            <OrderStatusModal
                isOpen={orderStatusIsOpen}
                toggle={toggleOrderStatus}
                closeFunction={() => toggleOrderStatus()}
                orderStatusFunction={orderStatusUpdateRecord}
                prevStatus={recordToOrderStatus?.status}
            />
            <OrdersTable
                data={data.data}
                editNavigate={editRecord}
                deleteRecord={showDeleteModal}
                showMoreNavigate={showMoreRecord}
                restoreItem={showRestoreModal}
            />
        </div>
    )
}
