import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export type CategoryColumn = {
    id: string
    name: string
    bannerLabel: string
    createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "bannner",
        header: "Banner",
        cell: ({row}) => row.original.bannerLabel
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({row}) => <CellAction data={row.original}/>,
    }
]