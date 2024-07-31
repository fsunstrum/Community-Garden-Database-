'use client'

import Select from '@mui/material/Select'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { useState } from 'react';

export default function TableSelect( { tables, callback, numAttrs } ) {
    const [tblSelected, setTblSelected] = useState("");

    const selectItems = tables.map((tbl) => <MenuItem key={tbl} value={tbl}>
        {tbl.charAt(0).toUpperCase() + tbl.slice(1)}
    </MenuItem>)

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