'use client'

import Select from '@mui/material/Select'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { useState } from 'react';

/**
 * Component to display a table select dropdown.
 * @param {Object} props - The component props.
 * @param {Array} props.tables - The array of table names.
 * @param {Function} props.callback - The callback function to handle table selection.
 * @param {Number} props.numAttrs - The number of selected attributes.
 * @returns {JSX.Element} The TableSelect component.
 */
export default function TableSelect( { tables, callback, numAttrs } ) {
    const [tblSelected, setTblSelected] = useState("");

    // Map tables data to select menu items
    const selectItems = tables.map((tbl) => <MenuItem key={tbl} value={tbl}>
        {tbl.charAt(0).toUpperCase() + tbl.slice(1)}
    </MenuItem>)

// Handle select change and trigger the callback
    const handleChange = async (e) => {
        await callback(e);
        setTblSelected(e.target.value);
    }

    return (<Box width={200}>
        <FormControl fullWidth error={numAttrs == 0 ? true : null}>
            <InputLabel id="table-select-label">
                Table
            </InputLabel>
            <Select 
                value = {tblSelected}
                label="Table"
                onChange={handleChange}
            >
                <MenuItem value="">None</MenuItem>
                {selectItems}
            </Select>
            {numAttrs == 0 ? <FormHelperText>You need to select at least one attribute!</FormHelperText> : null}
        </FormControl>
    </Box>)
}