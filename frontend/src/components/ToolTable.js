import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton, TextField, Switch } from '@mui/material'
import React, { useState } from 'react';
import { styled } from '@mui/system';
// import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

// Custom styled switch component
const GreenSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#548060',
        '&:hover': {
            backgroundColor: 'rgba(76, 175, 80, 0.08)',
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#4caf50',
    },
}));

/**
* Component to display a table of tools with availability toggle switches.
* @param {Object} props - The component props.
* @param {Array} props.tools - The array of tools.
* @param {Function} props.onToggleAvailability - The callback function to handle availability toggling.
* @returns {JSX.Element} The ToolTable component.
*/
export default function ToolTable({ tools, onToggleAvailability }) {
    /**
     * Handle the toggle switch change for tool availability.
     * @param {string} toolType - The type of the tool.
     * @param {string} gardenAddress - The address of the garden.
     * @param {string} currentAvailability - The current availability status of the tool.
     */
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
                                <GreenSwitch
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