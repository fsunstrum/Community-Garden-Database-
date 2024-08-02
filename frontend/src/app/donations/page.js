'use client'

import styles from './page.module.css';
import Image from 'next/legacy/image';
import DonationsTable from '@/components/DonationsTable';
import DonationForm from '@/components/DonationForm';
import Divider from '@mui/material/Divider';
import { useState, useEffect } from 'react'

/**
 * Donations page component for displaying and filtering donations.
 * @returns {JSX.Element} The Donations component.
 */
export default function Donations() {
    // State variables to manage the donations data and filter inputs
    const [donations, setDonations] = useState([]);
    const [search, setSearch] = useState('');
    const [donorName, setDonorName] = useState('');
    const [gardenAddress, setGardenAddress] = useState('');
    const [date, setDate] = useState('');
    const [dateCondition, setDateCondition] = useState('equals');

    /**
     * Fetch donations from the API with optional query parameters.
     * @param {string} [query=''] - Optional query string for filtering donations.
     */
    const fetchDonations = async (query = '') => {
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

    // useEffect hook to fetch donations when the component mounts
    useEffect(() => {
        fetchDonations();
    }, []);

    /**
     * Handler function for search/filter form submission.
     * @param {Event} e - The form submission event.
     */
    const handleSearch = (e) => {
        e.preventDefault();
        fetchDonations(search);
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Image
                    src="/gardens.jpg"
                    alt="Donation"
                    layout="fill"
                    objectFit="cover"
                    className={styles.headerImage}
                />
                <div className={styles.headerContent}>
                    <h1 className={styles.headerTitle}>DONATIONS</h1>
                </div>
            </header>
            {/* <h2 className={styles.mainHeader}>Donations History</h2> */}
            <main className={styles.main}>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <p>Filter Donations By:</p>
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
                    <div className={styles.inlineContainer}>
                        <select
                            value={dateCondition}
                            onChange={(e) => setDateCondition(e.target.value)}
                            className={`${styles.searchInput} ${styles.selectInput}`}
                        >
                            <option value="equals">Equals</option>
                            <option value="before">Before</option>
                            <option value="after">After</option>
                        </select>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className={styles.searchDateInput}
                        />
                    </div>
                    <button type="submit" className={styles.searchButton}>Filter</button>
                </form>
                <section className={styles.table}>
                    <DonationsTable donations={donations}></DonationsTable>
                </section>
            </main>
            <Divider></Divider>
            <section className={styles.form}>
                <DonationForm callback={() => fetchDonations()}></DonationForm>
            </section>
        </div>
    );
}