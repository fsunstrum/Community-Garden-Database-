import styles from './page.module.css';
import Image from 'next/legacy/image';
import DonationsTable from '@/components/DonationsTable';
import DonationForm from '@/components/DonationForm';

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
                <Image
                    src="/donation.jpg"
                    alt="Donation"
                    layout="fill"
                    objectFit="cover"
                    className={styles.headerImage}
                />
                <div className={styles.headerContent}>
                    <h1 className={styles.headerTitle}>DONATIONS</h1>
                </div>
            </header>
            <main className={styles.main}>
                <section className={styles.table}>
                    <DonationsTable donations={donations}></DonationsTable>
                </section>
                <section className={styles.form}>
                    <DonationForm />
                </section>
            </main>
        </div>
    );
}