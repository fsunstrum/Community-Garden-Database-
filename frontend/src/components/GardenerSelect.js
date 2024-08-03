import Select from '@mui/material/Select'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react'

/**
 * GardenerSelect component for selecting a gardener to assign to a plot.
 * @param {Object} props - The component props.
 * @param {Array} props.gardeners - List of gardeners.
 * @param {Array} props.garden - Garden details.
 * @param {Number} props.plotNum - Plot number.
 * @param {Function} props.callback - Callback function to refresh the garden plots.
 * @returns {JSX.Element} The GardenerSelect component.
 */
export default function GardenerSelect({ gardeners, garden, plotNum, callback }) {
    const [email, setEmail] = useState("");
    const [hasError, setHasError] = useState(false);

    // Map gardeners data to menu items
    const menuItems = gardeners.map((gar) => 
    <MenuItem key={gar[0]} value={gar[1]}>{gar[0]}</MenuItem>)

    /**
     * Handle gardener selection change.
     * @param {Object} e - The event object.
     */
    const handleChange = async (e) => {
        setEmail(e.target.value);
        setHasError(false);
        if (e.target.value == "") return

        const data = {"garden_address": garden[0], "gardener_email": e.target.value, "plot_num": plotNum}

        const res = await fetch("http://localhost:65535/api/garden/plots", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"}
            }
        ).then(res => {
            if (!res.ok) {
                setHasError(true);
            } else {
                callback(garden);
            }
            return res.json();
        }).then(res => console.log(res))
        .catch(err => console.error(err));
    };

    return (<Box>
        <FormControl fullWidth error={hasError}>
            <InputLabel id="gardener-select-label">
                Gardener
            </InputLabel>
            <Select 
                value = {email}
                label="Gardener"
                onChange={handleChange}
            >
                <MenuItem value="">None</MenuItem>
                {menuItems}
            </Select>
        </FormControl>
    </Box>)
}