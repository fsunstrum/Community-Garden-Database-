'use client'

import styles from './page.module.css';
import Image from 'next/legacy/image';
import DonationsTable from '@/components/DonationsTable';
import DonationForm from '@/components/DonationForm';
import { useState, useEffect } from 'react'

export default async function Donations() {
    const [donations, setDonations] = useState([]);

    const fetchDonations = async () => {
        const res = await fetch('http://localhost:65535/api/donations', { cache: "no-store" })
            .then(resp => resp.json())
            .catch(err => {
                console.error(err);
                return [];
            });

        setDonations(res);
    }

    useEffect(() => {
        fetchDonations();
    }, []);


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
                    <DonationForm callback={fetchDonations}></DonationForm>
                </section>
            </main>
        </div>
    );
}