'use client'

import styles from './page.module.css';
import Image from 'next/legacy/image';
import DonationsTable from '@/components/DonationsTable';
import DonationForm from '@/components/DonationForm';
import Alert from '@mui/material/Alert';
import { useState, useEffect } from 'react'
import GenericTable from '@/components/GenericTable';
import TableSelect from '@/components/TableSelect';
import AttributeCheckboxes from '@/components/AttributeCheckboxes';

/**
 * Admin page component for viewing and managing tables.
 * @returns {JSX.Element} The AdminPage component.
 */
export default function AdminPage() {
    const [tables, setTables] = useState([]);
    const [tableSelected, setTableSelected] = useState("");
    const [table, setTable] = useState([]);
    const [attrs, setAttrs] = useState([]);
    const [attrsSelected, setAttrsSelected] = useState([]);

    /**
     * Fetches the list of available tables.
     */
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

    /**
     * Fetches the attributes of a selected table.
     * @param {string} tname - The name of the table.
     */
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

    /**
     * Fetches the data of a selected table with selected attributes.
     * @param {string} tname - The name of the table.
     * @param {string[]} attrs - The selected attributes.
     */
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

    // Fetch the list of tables when the component mounts
    useEffect(() => {
        fetchTables();
    }, []);

    /**
     * Handles the form submission to fetch and display table data.
     * @param {Event} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const selected = []
        for (var i = 0; i < attrs.length; i++) {
            const check = e.target["check" + i];
            if (check.checked) selected.push(check.value);
        }

        setAttrsSelected(selected);

        if (selected.length == 0) {
            setTable([]);
            return;
        }

        await fetchTable(tableSelected, selected);
    }

    /**
     * Handles the table selection change to fetch and display attributes.
     * @param {Event} e - The select change event.
     */
    const handleSelect = async (e) => {
        await fetchAttributes(e.target.value);
        setTableSelected(e.target.value);
        setTable([]);
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Image
                    src="/admin.jpg"
                    alt="Admin"
                    layout="fill"
                    objectFit="cover"
                    className={styles.headerImage}
                />
                <div className={styles.headerContent}>
                    <h1 className={styles.headerTitle}>ADMIN PAGE</h1>
                </div>
            </header>
            <main className={styles.main}>
                <h2 className={styles.mainHeader}>
                    View a Table
                </h2>
                <form onSubmit={handleSubmit} className={styles.searchForm}>
                    <TableSelect tables={tables} callback={handleSelect} numAttrs={attrsSelected.length}></TableSelect>
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