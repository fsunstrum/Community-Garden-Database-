import styles from './page.module.css';
import DonationsTable from '@/components/DonationsTable';

export default async function Donations() {
  const donations = await fetch('http://localhost:65535/api/donations')
    .then(resp => resp.json())
    .catch(err => {
      console.error(err);
      return [];
    });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Donations History</h1>
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.infoSection}>
          <DonationsTable doantions={donations}></DonationsTable>
        </section>
      </main>
    </div>
  );
}