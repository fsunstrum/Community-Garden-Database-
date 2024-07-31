'use client'

import styles from './page.module.css';
import Image from 'next/legacy/image';
import DonationsTable from '@/components/DonationsTable';
import DonationForm from '@/components/DonationForm';
import { useState, useEffect } from 'react'

export default function Donations() {
    const [donations, setDonations] = useState([]);
    const [search, setSearch] = useState('');
    const [donorName, setDonorName] = useState('');
    const [gardenAddress, setGardenAddress] = useState('');
    const [date, setDate] = useState('');
    const [dateCondition, setDateCondition] = useState('equals');

    const fetchDonations = async (query = '') => {
        // const url = query ? `http://localhost:65535/api/donations?search=${encodeURIComponent(query)}` : 'http://localhost:65535/api/donations';
        const url = new URL('http://localhost:65535/api/donations');
        if (donorName) url.searchParams.append('donorName', donorName);
        if (gardenAddress) url.searchParams.append('gardenAddress', gardenAddress);
        if (date) url.searchParams.append('date', date);
        if (dateCondition) url.searchParams.append('dateCondition', dateCondition);

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
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="Donor Name"
                        className={styles.searchInput}
                    />
                    <input
                        type="text"
                        value={gardenAddress}
                        onChange={(e) => setGardenAddress(e.target.value)}
                        placeholder="Garden Address"
                        className={styles.searchInput}
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={styles.searchInput}
                    />
                    <select
                        value={dateCondition}
                        onChange={(e) => setDateCondition(e.target.value)}
                        className={styles.searchInput}
                    >
                        <option value="equals">Equals</option>
                        <option value="before">Before</option>
                        <option value="after">After</option>
                    </select>
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