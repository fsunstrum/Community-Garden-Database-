import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Button, Grid, Alert } from '@mui/material';

export default function GenericTable({ rows, col_names }) {
    const rowComponents = rows.map((row) => <TableRow key={row}>
        {row.map((r) => <TableCell>{r}</TableCell>)}
    </TableRow>)

    const headRow = <TableRow>{col_names.map((col) => <TableCell>{col}</TableCell>)}</TableRow>

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