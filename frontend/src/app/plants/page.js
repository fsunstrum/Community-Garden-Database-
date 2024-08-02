'use client'

import styles from './page.module.css';
import Image from 'next/legacy/image';
import PlantTable from '@/components/PlantTable';
import GardenerTable from '@/components/GardenerTable';
import GardenerForm from '@/components/GardenerForm';
import UpdateGardenerForm from '@/components/UpdateGardenerForm';
import GardenerEditModal from '@/components/GardenerEditModal';
import { useState, useEffect } from 'react'
import Divider from '@mui/material/Divider';

/**
 * Plants page component for displaying a list of plants.
 * @returns {JSX.Element} The Plants component.
 */
export default function Plants() {

  const [plants, setPlants] = useState([]);

  /**
   * Fetch the list of plants from the API.
   */
  const fetchPlants = async () => {
    const res = await fetch(`http://localhost:65535/api/plants`)
    .then(resp => resp.json())
      .catch(err => {
        console.error(err);
        return [];
      });
      setPlants(res);
  }

  // useEffect hook to fetch plants when the component mounts
  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
                <Image
                    src="/gardener.jpg"
                    alt="Gardener"
                    layout="fill"
                    objectFit="cover"
                    className={styles.headerImage}
                />
                <div className={styles.headerContent}>
                    <h1 className={styles.headerTitle}>OUR PLANTS</h1>
                </div>
            </header>
      <main className={styles.main}>
        <section className={styles.infoSection}>
          <PlantTable plants = {plants} callback = {fetchPlants}>

          </PlantTable>
          
        </section>
      </main>
    </div>
  );
}