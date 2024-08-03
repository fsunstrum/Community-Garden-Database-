import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

/**
 * GardenTable component to display a table of gardens.
 * @param {Object} props - The component props.
 * @param {Array} props.gardens - The array of gardens data.
 * @param {Array} props.columns - The array of column names.
 * @returns {JSX.Element} The GardenTable component.
 */
export default function GardenTable({ gardens, columns }) {
    const tableRows = gardens.map((row, idx) => {
        const gardenName = row[1];
        const link = "../garden?name=" + gardenName;
        return (<TableRow key={idx}>
            {row.map((v, i) => 
            <TableCell key={"cell-" + i}>
                {i == 1 ? <Link href={link}>{v}</Link> : v}
                </TableCell>)}
        </TableRow>)
    })

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    {columns.map((col, idx) => <TableCell key={idx}>{col}</TableCell>)}
                </TableRow>
                </TableHead>
                <TableBody>
                {tableRows}
                </TableBody>
            </Table>
        </TableContainer>
    )
}