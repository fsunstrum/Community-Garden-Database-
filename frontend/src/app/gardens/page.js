'use client'

import styles from './page.module.css';
import GardenTable from '@/components/GardenTable';
import GardenForm from '@/components/GardenForm';
import { useState, useEffect } from 'react'

export default function Gardens() {
  const [gardens, setGardens] = useState([]);

  const fetchGardens = async () => {
    const res = await fetch('http://localhost:65535/api/gardens', { cache: "no-store" })
    .then(resp => resp.json())
    .catch(err => {
      console.error(err);
      return [];
    });

    setGardens(res);
  };

  useEffect(() => {
    fetchGardens();
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
          <GardenTable gardens={gardens}></GardenTable>
          <GardenForm callback={fetchGardens}></GardenForm>
        </section>
      </main>
    </div>
  );
}