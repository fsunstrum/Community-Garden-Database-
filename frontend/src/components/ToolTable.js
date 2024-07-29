import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton, TextField } from '@mui/material'
import React, { useState } from 'react';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

export default function ToolTable({ tools }) { 

    const [newToolType, setNewToolType] = useState('');
    const [newAvailability, setNewAvailability] = useState('');

    const handleAddRow = () => {
        if (newToolType && newAvailability) {
            const newRow = [newToolType, newAvailability];
            setTools([...tools, newRow]);

            setNewToolType('');
            setNewAvailability('');
        }
    };


    const tableRows = tools.map((row, idx) => (
        <TableRow key={idx}>
            {row.map((v, i) => <TableCell key={i}>{v}</TableCell>)}
            <TableCell>
                <IconButton>
                    <DeleteForeverRoundedIcon />
                </IconButton>
            </TableCell>
        </TableRow>  
    ))

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                        <TableCell>Tool Type</TableCell>
                        <TableCell>Availability</TableCell>
                </TableRow>

                </TableHead>
                <TableBody>
                {tableRows}
                <TableRow>
                        <TableCell>
                            <TextField 
                                value={newToolType} 
                                onChange={(e) => setNewToolType(e.target.value)} 
                                placeholder="Tool Type" 
                            />
                        </TableCell>
                        <TableCell>
                            <TextField 
                                value={newAvailability} 
                                disabled
                            />
                        </TableCell>
                        <TableCell>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={handleAddRow}
                            >
                                Add
                            </Button>
                        </TableCell>
                    </TableRow>                
                </TableBody>
            </Table>
        </TableContainer>
    )
}