import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Button, Grid, Alert } from '@mui/material';
import React, { useRef, useState } from 'react';

export default function PlantTable({ plants, col_names }) {


    const [alertMsg, setAlertMsg] = useState("");
    const [hasError, setHasError] = useState(false);

const tableRows = plants.map((row, idx) => (
    <TableRow key={idx}>
        {row.map((v, i) => <TableCell key={i}>{v}</TableCell>)}
        {/* <TableCell>
            <Checkbox
                inputRef={el => checkboxesRef.current[idx] = el}
            />
        </TableCell> */}
    </TableRow>
))


return (

    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Species</TableCell>
                    <TableCell>Variety</TableCell>
                    <TableCell>Common name</TableCell>
                    <TableCell>Color</TableCell>
                    <TableCell>Days to harvest</TableCell>

                </TableRow>
            </TableHead>
            <TableBody>
                {tableRows}
            </TableBody>
        </Table>

        {alertMsg && (
            <Alert severity={hasError ? "error" : "success"}>
                {alertMsg}
            </Alert>
        )}
    </TableContainer>



)
}