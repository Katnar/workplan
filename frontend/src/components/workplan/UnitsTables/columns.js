import { ColumnFilter } from './ColumnFilter'
export const COLUMNS = [
    {
        Header: 'מצבה',
        accessor: 'matzeva',
        Filter: ColumnFilter
    },
    {
        Header: 'כשיר',
        accessor: 'unfit',
        Filter: ColumnFilter
    },
    {
        Header: 'לא כשיר',
        accessor: 'notUnfit',
        Filter: ColumnFilter
    },
    {
        Header: '% כשירות',
        accessor: 'unfitPercent',
        Filter: ColumnFilter
    },
]