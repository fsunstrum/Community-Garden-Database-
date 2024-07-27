import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function GardenPlotsTable({ plots }) {
    const tableRows = plots.map((row, idx) => (
        <TableRow key={idx}>
            {row.map((v, i) => 
                (i == 8) ? <TableCell key={i}>{v.slice(0, 10)}</TableCell> :
                <TableCell key={i}>{v}</TableCell>
            )}
        </TableRow>
    ));

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Plot #</TableCell>
                        <TableCell>Gardener</TableCell>
                        <TableCell>Sun Exposure</TableCell>
                        <TableCell>Plot Size (m²)</TableCell>
                        <TableCell>Species</TableCell>
                        <TableCell>Genus</TableCell>
                        <TableCell>Variety</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Plant Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableRows}
                </TableBody>
            </Table>
        </TableContainer>
    );
}