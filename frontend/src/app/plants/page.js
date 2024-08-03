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
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';


/**
 * Plants page component for displaying a list of plants.
 * @returns {JSX.Element} The Plants component.
 */
export default function Plants() {

  const [plants, setPlants] = useState([]);
  const [popPlants, setPopPlants] = useState([]);


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

  const fetchPopularPlants = async () => {
    const res = await fetch(`http://localhost:65535/api/plants/popular`)
    .then(resp => resp.json())
      .catch(err => {
        console.error(err);
        return [];
      });
      setPopPlants(res);
  }

  // useEffect hook to fetch plants when the component mounts
  useEffect(() => {
    fetchPlants();
    fetchPopularPlants();
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
        <Typography align="center" variant="h2" className={styles.lowQualHeader}>All plants:</Typography>

          <PlantTable plants = {plants} callback = {fetchPlants}>

          </PlantTable>
          <div className={styles.lowQualityTitle}>
          <Typography align="center" variant="h2" className={styles.lowQualHeader}>Our most popular plants:</Typography>
          <Tooltip title="* These plants are grown in every garden" className={styles.toolTip}>
            <IconButton className={styles.infoIcon}>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </div>
          <PlantTable plants = {popPlants} callback = {fetchPopularPlants}>

          </PlantTable>
          
        </section>
      </main>
    </div>
  );
}