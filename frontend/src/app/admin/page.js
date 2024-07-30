'use client'

import styles from './page.module.css';
import Image from 'next/legacy/image';
import DonationsTable from '@/components/DonationsTable';
import DonationForm from '@/components/DonationForm';
import { useState, useEffect } from 'react'
import GenericTable from '@/components/GenericTable';
import TableSelect from '@/components/TableSelect';
import AttributeCheckboxes from '@/components/AttributeCheckboxes';

export default function AdminPage() {
    const [tables, setTables] = useState([]);
    const [tableSelected, setTableSelected] = useState("");
    const [table, setTable] = useState([]);
    const [attrs, setAttrs] = useState([]);
    const [attrsSelected, setAttrsSelected] = useState([]);

    const fetchTables = async () => {
        const url = `http://localhost:65535/api/tables`;
        const res = await fetch(url)
            .then(resp => resp.json())
            .catch(err => {
                console.error(err);
                return [];
            });

        setTables(res);
    }

    const fetchAttributes = async (tname) => {
        if (tname == "") {
            setAttrs([]);
            setAttrsSelected([]);
            return;
        }
        const url = `http://localhost:65535/api/table/attrs?name=${tname}`;
        const res = await fetch(url)
        .then((resp) => resp.json())
        .catch(err => {
            console.error(err);
            return []
        });

        setAttrs(res);
        setAttrsSelected(res);
    }

    const fetchTable = async(tname, attrs) => {
        const url = `http://localhost:65535/api/table/${tname}?attrs=${attrs.join(",")}`;
        const res = await fetch(url)
        .then((resp) => resp.json())
        .catch(err => {
            console.error(err);
            return []
        });

        setTable(res);
    }

    useEffect(() => {
        fetchTables();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const selected = []
        for (var i = 0; i < attrs.length; i++) {
            const check = e.target["check" + i];
            if (check.checked) selected.push(check.value);
        }
        setAttrsSelected(selected);

        fetchTable(tableSelected, selected);
    }

    const handleSelect = async (e) => {
        await fetchAttributes(e.target.value);
        setTableSelected(e.target.value);
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
                    <h1 className={styles.headerTitle}>ADMIN PAGE</h1>
                </div>
            </header>
            <main className={styles.main}>
                <h2 className={styles.mainHeader}>View a Table</h2>
                <form onSubmit={handleSubmit} className={styles.searchForm}>
                    <TableSelect tables={tables} callback={handleSelect}></TableSelect>
                    <AttributeCheckboxes attrs={attrs}></AttributeCheckboxes>
                    <button type="submit" className={styles.searchButton}>Search</button>
                </form>
                <section className={styles.table}>
                <GenericTable rows={table} col_names={attrsSelected}></GenericTable>
                </section>
            </main>
        </div>
    );
}