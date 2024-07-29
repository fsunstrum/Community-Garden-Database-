'use client'

import styles from './page.module.css';
import GardenerTable from '@/components/GardenerTable';
import GardenerForm from '@/components/GardenerForm';
import UpdateGardenerForm from '@/components/UpdateGardenerForm';
import GardenerEditModal from '@/components/GardenerEditModal';
import { useState, useEffect } from 'react'
import Divider from '@mui/material/Divider';

export default function Gardeners() {
  const [gardeners, setGardeners] = useState([]);
  const [editingGardener, setEditingGardener] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchGardeners = async () => {
    const res = await fetch('http://localhost:65535/api/gardeners', { cache: "no-store" })
      .then(resp => resp.json())
      .catch(err => {
        console.error(err);
        return [];
      });

    setGardeners(res);
  };

  useEffect(() => {
    fetchGardeners();
  }, []);

  const handleEditClick = (gardener) => {
    setEditingGardener(gardener);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingGardener(null);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Registered Gardeners</h1>
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.infoSection}>
          <GardenerTable gardeners={gardeners} callback={fetchGardeners} onEdit={handleEditClick} />
          <br></br>
          <Divider></Divider>
          <br></br>
          <GardenerForm callback={fetchGardeners}></GardenerForm>
          <br></br>
          <Divider></Divider>
          <br></br>
          <GardenerEditModal
            open={isEditModalOpen}
            onClose={handleCloseModal}
            gardener={editingGardener}
            callback={fetchGardeners}
          />
        </section>
      </main>
    </div>
  );
}