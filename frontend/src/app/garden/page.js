'use client'

import styles from './page.module.css';
import GardenInfo from '@/components/GardenInfo';
import { useState, useEffect } from 'react'
import Divider from '@mui/material/Divider';

import { useSearchParams } from 'next/navigation'
import GardenPlotsTable from '@/components/GardenPlotsTable';
import Typography from '@mui/material/Typography';

export default function Garden() {
    const searchParams = useSearchParams();
    const gardenName = searchParams.get('name');

    const [plots, setPlots] = useState([]);
    const [garden, setGarden] = useState({});
    const [hasError, setHasError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    if (!gardenName || !garden) return (<div>Garden was not found, please check the spelling.</div>);

    const fetchGarden = async () => {
        const res = await fetch(`http://localhost:65535/api/garden?name=${gardenName.replace(" ", "%20")}`)
        .then(resp => {
            if (resp.ok) setHasError(false);
            else setHasError(true);

            return resp.json();
        })
        .catch(err => {
        console.error(err);
        return [];
        });

        setGarden(res);
    };

    const fetchPlots = async (garden) => {
        const res = await fetch(`http://localhost:65535/api/garden/plots?name=${gardenName.replace(" ", "%20")}`)
        .then(resp => {
            if (resp.ok) setHasError(false);
            else setHasError(true);

            return resp.json();
        })
        .catch(err => {
        console.error(err);
        return [];
        });

        setPlots(res);
    };

    useEffect(() => {
        fetchGarden();
        fetchPlots();
    }, []);

    return (
        <div className={styles.container}>
        <header className={styles.header}>
            <div className={styles.headerContent}>
            <h1 className={styles.headerTitle}>Current Gardens</h1>
            </div>
        </header>
        <main className={styles.main}>
            <section className={styles.infoSection}>
                <GardenInfo data={garden} hasError={hasError} errorMsg={errorMsg}></GardenInfo>
                <br></br>
                <Divider></Divider>
                <br></br>
                <Typography variant="h3" align="center">Currently Planted</Typography>
                <GardenPlotsTable plots={plots}></GardenPlotsTable>
            </section>
        </main>
        </div>
    );
    }