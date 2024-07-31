'use client'

import styles from './page.module.css';
import Image from 'next/legacy/image';
import GardenTable from '@/components/GardenTable';
import GardenForm from '@/components/GardenForm';
import { useState, useEffect } from 'react'
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Gardens() {
  const [gardens, setGardens] = useState([]);
  const [underachievers, setUnderachievers] = useState([]);
  const [minPlots, setMinPlots] = useState(0);

  const fetchGardens = async () => {
    const res = await fetch(`http://localhost:65535/api/gardens?minPlots=${minPlots}`)
    .then(resp => resp.json())
    .catch(err => {
      console.error(err);
      return [];
    });

    setGardens(res);
  };

  const fetchUnderachievers = async () => {
    const res = await fetch('http://localhost:65535/api/gardens/underachievers')
    .then(resp => resp.json())
    .catch(err => {
      console.error(err);
      return [];
    });

    setUnderachievers(res);
  }

  useEffect(() => {
    fetchGardens();
    fetchUnderachievers();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchGardens();
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
                <Image
                    src="/donation.jpg"
                    alt="Gardens"
                    layout="fill"
                    objectFit="cover"
                    className={styles.headerImage}
                />
                <div className={styles.headerContent}>
                    <h1 className={styles.headerTitle}>CURRENT GARDENS</h1>
                </div>
            </header>
      <main className={styles.main}>
        <form onSubmit={handleFilter} className={styles.searchForm}>
          <Stack direction={"row"} alignItems={"center"}>
          <label className={styles.formLabel}>
            Minimum Plots
          <input
              type="number"
              min={0}
              value={minPlots}
              onChange={(e) => setMinPlots(e.target.value)}
              className={styles.searchInput}
          />
          </label>
          <button type="submit" className={styles.searchButton}>Filter</button>
          </Stack>
        </form>
        <section className={styles.infoSection}>
          <GardenTable gardens={gardens} columns={["Address", "Garden Name", "# of Plots", "Manager Email"]}></GardenTable>
          <br></br>
          <Divider></Divider>
          <br></br>
          <GardenForm callback={fetchGardens}></GardenForm>
          <br></br>
          <Divider></Divider>
          <br></br>
          <Typography align="center" variant="h2">Low Quantity Gardens</Typography>
          <GardenTable gardens={underachievers} columns={["Address", "Garden Name", "# of Plots", "Total Plants Planted"]}></GardenTable>
          <Typography variant="subtitle2">* Gardens that have total plants planted less than the average total for all gardens</Typography>
        </section>
      </main>
    </div>
  );
}