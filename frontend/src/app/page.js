import Head from 'next/head';
import Image from 'next/legacy/image';
import styles from '@/styles/page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Community Gardens</title>
        <meta name="description" content="Manage your community gardens effectively" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Image
          src="/garden.jpg"
          alt="Community Gardens"
          layout="fill"
          objectFit="cover"
          className={styles.headerImage}
        />
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>COMMUNITY GARDENS</h1>
          <a href="/gardens" className={styles.headerButton}>SEE GARDENS</a>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.infoSection}>
          <h2>About This Project</h2>
          <p>
          This database management system will be used by a municipality to store information about various community gardens throughout 
          the city so that they can better organize these community gardens. Each garden will be managed by different community organizations 
          and they will record the plants that are seeded in each plot and the gardeners who are assigned to each plot. There will also be 
          donations of tools and plants which are recorded so that the garden members will know what is available for use.
          </p>
        </section>
      </main>
    </div>
  );
}
