'use client'

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function GardenInfo({ data, hasError, errorMsg }) {
    return (
        <Stack>
            <div>{hasError ? <Alert severity={"error"}>{errorMsg}</Alert> : null}</div>
            {/* <Typography variant="h1" align="center">{data[1]}</Typography> */}
            <Typography>Garden Address: {data[0]}</Typography>
            <Typography>Number of Plots: {data[2]}</Typography>
            <Typography>Manager Email: {data[3]}</Typography>
        </Stack>
    );
};