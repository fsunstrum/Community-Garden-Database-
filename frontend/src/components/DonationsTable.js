import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function DonationsTable({ donations }) {
    const tableRows = donations.map((row, idx) => (
        <TableRow key={idx}>
            {row.map((v, i) => <TableCell key={i}>{v}</TableCell>)}
        </TableRow>
    ));

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Donation ID</TableCell>
                        <TableCell>Donor Name</TableCell>
                        <TableCell>Donation Date</TableCell>
                        <TableCell>Item</TableCell>
                        <TableCell>Garden Address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableRows}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
