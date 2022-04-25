import {ColumnFilter} from './ColumnFilter'
export const COLUMNS = [
    {
        Header: 'שם',
        Footer:'שם',
        accessor:'name',
        Filter:ColumnFilter
    },
    {
        Header: 'שם משפחה',
        Footer:'שם משפחה',
        accessor:'lastname',
        Filter:ColumnFilter

    },
    {
        Header: 'מספר אישי',
        Footer:'מספר אישי',
        accessor:'personalnumber',
        Filter:ColumnFilter

    },
    {
        Header: 'הרשאה',
        Footer:'הרשאה',
        accessor:'role',
        Filter:ColumnFilter
    },
    {
        Header: 'תוכניות עבודה',
        Footer:'תוכניות עבודה',
        accessor:'workplan',
        Filter:ColumnFilter
    },
    {
        Header: 'כשירות',
        Footer:'כשירות',
        accessor:'kshirot',
        Filter:ColumnFilter
    },
    {
        Header: 'זמינות',
        Footer:'זמינות',
        accessor:'zminot',
        Filter:ColumnFilter
    },
    {
        Header: 'כוח אדם',
        Footer:'כוח אדם',
        accessor:'adam',
        Filter:ColumnFilter
    },
    {
        Header: 'נוצר בתאריך',
        Footer:'נוצר בתאריך',
        accessor:'createdAt',
        Filter:ColumnFilter

    },
    {
        Header: 'עודכן בתאריך',
        Footer:'עודכן בתאריך',
        accessor:'updatedAt',
        Filter:ColumnFilter

    }
] 