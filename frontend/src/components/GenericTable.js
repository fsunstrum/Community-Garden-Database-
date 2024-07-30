import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Button, Grid, Alert } from '@mui/material';

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