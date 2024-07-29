'use client'

import styles from './page.module.css';
import GardenInfo from '@/components/GardenInfo';
import { useState, useEffect } from 'react'
import Divider from '@mui/material/Divider';
import Image from 'next/legacy/image'

import { useSearchParams } from 'next/navigation'
import PlantedPlotsTable from '@/components/PlantedPlotsTable';
import Typography from '@mui/material/Typography';
import GardenPlotsTable from '@/components/GardenPlotsTable';
import ToolTable from '@/components/ToolTable';

export default function Garden() {
    const searchParams = useSearchParams();
    const gardenName = searchParams.get('name');

    const [plantedPlots, setPlantedPlots] = useState([]);
    const [plots, setPlots] = useState([]);
    const [garden, setGarden] = useState({});

    const [tools, setTools] = useState([]);

    const [hasError, setHasError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [gardeners, setGardeners] = useState([]);

    if (!gardenName || !garden) return (<div>Garden was not found, please check the spelling.</div>);

    const fetchGardeners = async () => {
        const res = await fetch('http://localhost:65535/api/gardeners')
        .then(resp => resp.json())
        .catch(err => {
            console.error(err);
            return [];
        });

        setGardeners(res);
    }

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

    const fetchPlantedPlots = async (garden) => {
        const res = await fetch(`http://localhost:65535/api/garden/plots/planted?name=${gardenName.replace(" ", "%20")}`)
        .then(resp => {
            if (resp.ok) setHasError(false);
            else setHasError(true);

            return resp.json();
        })
        .catch(err => {
        console.error(err);
        return [];
        });

        setPlantedPlots(res);
    };
    
    const fetchPlots = async (garden) => {
        const res = await fetch(`http://localhost:65535/api/garden/plots?address=${garden[0]}`)
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

    const fetchTools = async (garden) => {
        const res = await fetch(`http://localhost:65535/api/garden/tools?address=${garden[0]}`)
        .then(resp => {
            if (resp.ok) setHasError(false);
            else setHasError(true);

            return resp.json();
        })
        .catch(err => {
        console.error(err);
        return [];
        });

        setTools(res);
    }

    useEffect(() => {
        fetchGarden();
        fetchGardeners();
        
    }, []);

    useEffect(() => {
        fetchPlantedPlots(garden);
        fetchPlots(garden);
        // fetchTools();
    }, [garden])

    return (
        <div className={styles.container}>
        <header className={styles.header}>
            <Image
                src="/donation.jpg"
                alt="Donation"
                layout="fill"
                objectFit="cover"
                className={styles.headerImage}
            />
            <div className={styles.headerContent}>
                <Typography align="center" variant="h1">{garden[1]}</Typography>
            </div>
        </header>
        <main className={styles.main}>
            <section className={styles.infoSection}>
                <GardenInfo data={garden} hasError={hasError} errorMsg={errorMsg}></GardenInfo>
                <br></br>
                <Divider></Divider>
                <br></br>
                <Typography variant="h3" align="center">Currently Planted</Typography>
                <PlantedPlotsTable plots={plantedPlots}></PlantedPlotsTable>
                <br></br>
                <Divider></Divider>
                <br></br>
                <Typography variant="h3" align="center">Plot Assignment Table</Typography>
                <GardenPlotsTable 
                    garden={garden} 
                    gardeners={gardeners} 
                    plots={plots} 
                    numPlots={garden[2]}
                    callback={fetchPlots}>
                </GardenPlotsTable>
                <Typography variant="h3" align="center">Tool Availability</Typography>

                <ToolTable tools={tools}>
                    garden = {garden}
                    callback={fetchTools}
                </ToolTable>


            </section>
        </main>
        </div>
    );
    }