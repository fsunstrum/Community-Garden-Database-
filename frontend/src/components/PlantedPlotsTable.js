import * as React from 'react';

import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper 
} from '@mui/material';

export default function PlantedPlotsTable({ plots }) {
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