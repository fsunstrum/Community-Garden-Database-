import Select from '@mui/material/Select'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react'

export default function GardenerSelect({ gardeners, addr, plotNum }) {
    const [email, setEmail] = useState("");

    const menuItems = gardeners.map((gar) => 
    <MenuItem value={gar.email}>gar.name</MenuItem>)

    const handleChange = async (e) => {
        setEmail(e.target.value);
        console.log(e.target.value);
    };

    <Box>
        <FormControl fullWidth>
            <InputLabel id="gardener-select-label">
                Gardener
            </InputLabel>
            <Select 
                value = {email}
                label="Gardener"
                onChange={handleChange}
            >
                {menuItems}
            </Select>
        </FormControl>
    </Box>
}