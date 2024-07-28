import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';

export default function UnassignPlotButton({gardener, garden, plotNum, callback}) {
    const handleClick = async () => {
        const conf = confirm(`Are you sure you want to unassign ${gardener} from ${plotNum}? This action CANNOT be undone!`);

        if (!conf) return;

        const data = {"garden_address": garden[0], "plot_num": plotNum}

        const res = await fetch("http://localhost:65535/api/garden/plots", {
                method: "DELETE",
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"}
            }
        ).then(res => {
            if (!res.ok) {
                alert("There was an error while unassigning the gardener. Please try again later.")
            } else {
                callback(garden);
            }
            return res.json();
        }).then(res => console.log(res))
        .catch(err => console.error(err));
    }

    return (
        <IconButton aria-label="unassign" onClick={handleClick}>
            <RemoveCircleOutlineIcon color="red" />
        </IconButton>
    )
}