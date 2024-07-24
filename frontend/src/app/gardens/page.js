import styles from './page.module.css';
import GardenTable from '@/components/GardenTable';

export default async function Gardens() {
  const gardens = await fetch('http://localhost:65535/api/gardens')
    .then(resp => resp.json())
    .catch(err => {
      console.error(err);
      return [];
    });

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
        </section>
      </main>
    </div>
  );
}