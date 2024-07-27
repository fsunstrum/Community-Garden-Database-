'use client'

import styles from './page.module.css';
import Image from 'next/legacy/image';
import DonationsTable from '@/components/DonationsTable';
import DonationForm from '@/components/DonationForm';
import { useState, useEffect } from 'react'

export default function Donations() {
    const [donations, setDonations] = useState([]);
    const [search, setSearch] = useState('');

    const fetchDonations = async (query = '') => {
        const url = query ? `http://localhost:65535/api/donations?search=${encodeURIComponent(query)}` : 'http://localhost:65535/api/donations';
        const res = await fetch(url, { cache: "no-store" })
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

    const handleSearch = (e) => {
        e.preventDefault();
        fetchDonations(search);
    }

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
                <h2 className={styles.mainHeader}>Donation History</h2>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by donor name or garden address"
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>Search</button>
                </form>
                <section className={styles.table}>
                    <DonationsTable donations={donations}></DonationsTable>
                </section>
                <section className={styles.form}>
                    <DonationForm callback={() => fetchDonations()}></DonationForm>
                </section>
            </main>
        </div>
    );
}