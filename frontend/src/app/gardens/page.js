'use client'

import styles from './page.module.css';
import GardenTable from '@/components/GardenTable';
import GardenForm from '@/components/GardenForm';
import { useState, useEffect } from 'react'
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function Gardens() {
  const [gardens, setGardens] = useState([]);
  const [underachievers, setUnderachievers] = useState([]);

  const fetchGardens = async () => {
    const res = await fetch('http://localhost:65535/api/gardens')
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

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Current Gardens</h1>
        </div>
      </header>
      <main className={styles.main}>
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