import { ColumnFilter } from './ColumnFilter'
export const COLUMNS = [
    {
        Header: 'נוצר ע"י',
        accessor: 'namehonach',
        Filter: ColumnFilter
    },
    {
        Header: 'נוצר בתאריך',
        accessor: 'createdAt',
        Filter: ColumnFilter
    },
    {
        Header: 'עודכן בתאריך',
        accessor: 'updatedAt',
        Filter: ColumnFilter
    }
]