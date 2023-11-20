export type TableProps<DataType> = {
    data: DataType[]
    editNavigate: (data: DataType) => void
    deleteRecord: (recordId: string) => void
    showMoreNavigate: (data: DataType) => void
    editPassword?: (recordId: string) => void
    restoreItem?: (recordId: string) => void
}
