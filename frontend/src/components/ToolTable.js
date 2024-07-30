import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton, TextField, Switch } from '@mui/material'
import React, { useState } from 'react';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

export default function ToolTable({ tools, onToggleAvailability }) {
    const handleToggle = (toolType, gardenAddress, currentAvailability) => {
        const newAvailability = currentAvailability === 'Y' ? 'N' : 'Y';
        onToggleAvailability(toolType, gardenAddress, newAvailability);
    };

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
                    {tools.map((tool, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{tool[0]}</TableCell>
                            <TableCell>
                                <Switch
                                    checked={tool[1] === 'Y'}
                                    onChange={() => handleToggle(tool[0], tool[2], tool[1])}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// export default function ToolTable({ tools }) { 

//     const [newToolType, setNewToolType] = useState('');

//     const handleAddRow = () => {

//     };


//     const tableRows = tools.map((row, idx) => (
//         <TableRow key={idx}>
//             {row.map((v, i) => <TableCell key={i}>{v}</TableCell>)}
//             <TableCell>
//                 <IconButton>
//                     <DeleteForeverRoundedIcon />
//                 </IconButton>
//             </TableCell>
//         </TableRow>  
//     ))

//     return (
//         <TableContainer component={Paper}>
//             <Table>
//                 <TableHead>
//                 <TableRow>
//                         <TableCell>Tool Type</TableCell>
//                         <TableCell>Availability</TableCell>
//                 </TableRow>

//                 </TableHead>
//                 <TableBody>
//                 {tableRows}
//                 <TableRow>
//                         <TableCell>
//                             <TextField 
//                                 value={newToolType} 
//                                 onChange={(e) => setNewToolType(e.target.value)} 
//                                 placeholder="Tool Type" 
//                             />
//                         </TableCell>
//                         <TableCell>
//                             <TextField 
//                                 value={'Y'} 
//                                 disabled
//                             />
//                         </TableCell>
//                         <TableCell>
//                             <Button 
//                                 variant="contained" 
//                                 color="primary" 
//                                 onClick={handleAddRow}
//                             >
//                                 Add
//                             </Button>
//                         </TableCell>
//                     </TableRow>                
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     )
// }