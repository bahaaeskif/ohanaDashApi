import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { IEmployee, PageRoute } from '@store/types'
import { deleteEmployeeApi } from '@store/ui-core/api'
import {
    DeleteModal,
    EmployeesTable,
    LoaderPage,
    NavbarButtonSetting,
    NoData,
} from '@store/ui-core/components'
import { useEmployeesQuery, useModal } from '@store/ui-core/hooks'
import { currentPageAtom, navbarButtonPathAtom } from '@store/ui-core/recoil'
import { join } from '@store/utils/ui'

export const MainEmployee = () => {
    const { data, isLoading, refetch } = useEmployeesQuery()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const setNavbarButtonPath = useSetRecoilState(navbarButtonPathAtom)
    const setCurrentPage = useSetRecoilState(currentPageAtom)

    const {
        isOpen: deleteIsOpen,
        toggle: toggleDelete,
        state: recordIdToDelete,
        setState: setRecordIdToDelete,
    } = useModal<string>(null)

    const addRecord = () => navigate(PageRoute.ADD)

    const editRecord = (employee: IEmployee) => {
        setNavbarButtonPath({
            path: pathname,
            title: NavbarButtonSetting.CONFIRM,
            isLoading,
        })
        setCurrentPage((prev) => ({
            ...prev,
            recordTitle: employee.id,
        }))
        navigate(join(false, PageRoute.EDIT, employee.id), {
            state: {
                employee: employee,
            },
        })
    }

    const editPassword = (recordId: string) => {
        setNavbarButtonPath({
            path: pathname,
            title: NavbarButtonSetting.CONFIRM,
            isLoading,
        })
        setCurrentPage((prev) => ({
            ...prev,
            recordTitle: recordId,
        }))
        navigate(join(false, PageRoute.EDIT_PASSWORD, recordId), {
            state: {
                employeeId: recordId,
            },
        })
    }

    const showDeleteModal = (recordId: string) => {
        toggleDelete(true)
        setRecordIdToDelete(recordId)
    }

    const deleteRecord = async () => {
        if (recordIdToDelete) {
            const res = await deleteEmployeeApi(recordIdToDelete)
            toggleDelete(false)
            await refetch()
        }
    }

    const showMoreRecord = (record: IEmployee) => {
        setNavbarButtonPath({
            path: pathname,
            title: NavbarButtonSetting.BACK,
            isLoading: false,
        })
        setCurrentPage((prev) => ({
            ...prev,
            recordTitle: record.id,
        }))
        navigate(join(false, PageRoute.SHOW, record.id), {
            state: {
                employee: record,
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
            <EmployeesTable
                data={data.data}
                editNavigate={editRecord}
                deleteRecord={showDeleteModal}
                showMoreNavigate={showMoreRecord}
                editPassword={editPassword}
            />
        </div>
    )
}
