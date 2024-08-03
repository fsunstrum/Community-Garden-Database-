import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';

// Custom styled IconButton component
const CustomIconButton = styled(IconButton)(({ theme }) => ({
    color: '#505050',
    '&:hover': {
        color: 'red',
        background: 'transparent',
    },
}));

/**
* Component to unassign a gardener from a plot with a confirmation prompt.
* @param {Object} props - The component props.
* @param {string} props.gardener - The name of the gardener.
* @param {Array} props.garden - The garden data.
* @param {number} props.plotNum - The plot number.
* @param {Function} props.callback - The callback function to refresh the plot data.
* @returns {JSX.Element} The UnassignPlotButton component.
*/
export default function UnassignPlotButton({ gardener, garden, plotNum, callback }) {
    /**
     * Handle the unassign button click event.
     * Sends a DELETE request to unassign the gardener from the plot.
     */
    const handleClick = async () => {
        const conf = confirm(`Are you sure you want to unassign ${gardener} from ${plotNum}? This action CANNOT be undone!`);

        if (!conf) return;

        const data = { "garden_address": garden[0], "plot_num": plotNum }
        let hasError = false;

        const res = await fetch("http://localhost:65535/api/garden/plots", {
            method: "DELETE",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }
        ).then(res => {
            if (!res.ok) {
                hasError = true;
            } else {
                callback(garden);
            }
            return res.json();
        }).then(res => {
            if (hasError) alert("ERROR: " + res.message);
        })
            .catch(err => console.error(err));
    }

    return (
        <CustomIconButton aria-label="unassign" onClick={handleClick}>
            <RemoveCircleOutlineIcon />
        </CustomIconButton>
    )
}