'use client'

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import styles from '@/styles/GardenInfo.module.css';

/**
 * GardenInfo component to display garden details.
 * @param {Object} props - The component props.
 * @param {Array} props.data - The garden data.
 * @param {boolean} props.hasError - Flag indicating if there is an error.
 * @param {string} props.errorMsg - The error message to display if there is an error.
 * @returns {JSX.Element} The GardenInfo component.
 */
export default function GardenInfo({ data, hasError, errorMsg }) {
    return (
        <Stack>
            <div>{hasError ? <Alert severity={"error"}>{errorMsg}</Alert> : null}</div>
            {/* <Typography variant="h1" align="center">{data[1]}</Typography> */}
            <div>
                <Typography className={styles.label} component="span">Garden Address:</Typography>
                <Typography className={styles.data} component="span">{data[0]}</Typography>
            </div>
            <div>
                <Typography className={styles.label} component="span">Number of Plots:</Typography>
                <Typography className={styles.data} component="span">{data[2]}</Typography>
            </div>
            {data[3] !== null && (
                <div>
                    <Typography className={styles.label} component="span">Manager Email:</Typography>
                    <Typography className={styles.data} component="span">{data[3]}</Typography>
                </div>
            )}
            {data[4] !== null && (
                <div>
                    <Typography className={styles.label} component="span">Compost ID:</Typography>
                    <Typography className={styles.data} component="span">{data[4]}</Typography>
                </div>
            )}
            {data[5] !== null && (
                <div>
                    <Typography className={styles.label} component="span">Compost Capacity:</Typography>
                    <Typography className={styles.data} component="span">{data[5]} inch<sup>3</sup></Typography>
                </div>
            )}
        </Stack>
    );
};