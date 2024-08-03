import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Button, Grid, Alert } from '@mui/material';

/**
 * GenericTable component to display a table with dynamic columns and rows.
 * @param {Object} props - The component props.
 * @param {Array} props.rows - The array of table row data.
 * @param {Array} props.col_names - The array of column names.
 * @returns {JSX.Element} The GenericTable component.
 */
export default function GenericTable({ rows, col_names }) {
    const rowComponents = rows.map((row, idx) => <TableRow key={row + idx}>
        {row.map((r) => <TableCell key={r}>{r}</TableCell>)}
    </TableRow>)

    const headRow = <TableRow key={"head"}>{col_names.map((col, idx) => <TableCell key={idx}>{col}</TableCell>)}</TableRow>

    return (<TableContainer component={Paper}>
        <Table>
            <TableHead>
                {headRow}
            </TableHead>
            <TableBody>
                {rowComponents}
            </TableBody>
        </Table>
    </TableContainer>)
}