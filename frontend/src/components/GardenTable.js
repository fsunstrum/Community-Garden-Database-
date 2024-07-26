import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

export default function GardenTable({ gardens }) {
    const tableRows = gardens.map((row, idx) => {
        const gardenName = row[1];
        const link = "../garden?name=" + gardenName;
        return (<TableRow key={idx}>
            {row.map((v, i) => 
            <TableCell key={i}>
                {i == 1 ? <Link href={link}>{v}</Link> : v}
                </TableCell>)}
        </TableRow>)
    })

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>Garden Name</TableCell>
                    <TableCell># of Plots</TableCell>
                    <TableCell>Manager Email</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {tableRows}
                </TableBody>
            </Table>
        </TableContainer>
    )
}