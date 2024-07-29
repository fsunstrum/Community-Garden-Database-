'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/DonationForm.module.css';
import Alert from '@mui/material/Alert';

// const DonationForm = () => {
export default function DonationForm({ callback }) {
    const [alertMsg, setAlertMsg] = useState("");
    const [hasError, setHasError] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [gardenAddresses, setGardenAddresses] = useState([]);

    useEffect(() => {
        const fetchGardenAddresses = async () => {
            try {
                const res = await fetch('http://localhost:65535/api/gardens/addresses');
                const data = await res.json();
                setGardenAddresses(data);
            } catch (err) {
                console.error('Error fetching garden addresses:', err);
            }
        };

        fetchGardenAddresses();
    }, []);

    const handleSubmit = async (e) => {
        setSubmitted(true);

        e.preventDefault();

        const et = e.target;

        const formData = {
            "donation_id": et.donation_id.value,
            "donor_name": et.donor_name.value,
            "don_date": et.don_date.value,
            "item": et.item.value,
            "garden_address": et.garden_address.value
        }

        console.log("Form Data:", formData);

        try {
            const response = await fetch('http://localhost:65535/api/donations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }).then(resp => {
                if (resp.ok) {
                    setHasError(false);
                    setAlertMsg("Donation was added successfully!");
                    callback();
                } else return resp.json();
            });

            if (response) {
                setHasError(true);
                setAlertMsg(response.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {submitted ? <Alert severity={hasError ? "error" : "success"}>
                {alertMsg}
            </Alert> : null}
            <h2 className={styles.formTitle}>Make a Donation!</h2>
            <label className={styles.formLabel}>
                Donation ID
                <input
                    className={styles.formInput}
                    type="text"
                    name="donation_id"
                    defaultValue=""
                // value={formData.donation_id}
                // onChange={handleChange}
                />
            </label>
            <label className={styles.formLabel}>
                Name
                <input
                    className={styles.formInput}
                    type="text"
                    name="donor_name"
                    defaultValue=""
                // value={formData.donor_name}
                // onChange={handleChange}
                />
            </label>
            <label className={styles.formLabel}>
                Date
                <input
                    className={styles.formInput}
                    type="date"
                    name="don_date"
                    defaultValue=""
                // value={formData.don_date}
                // onChange={handleChange}
                />
            </label>
            <label className={styles.formLabel}>
                Item
                <input
                    className={styles.formInput}
                    type="text"
                    name="item"
                    defaultValue=""
                // value={formData.item}
                // onChange={handleChange}
                />
            </label>
            <label className={styles.formLabel}>
                Garden Address
                <select
                    className={styles.formInput}
                    type="text"
                    name="garden_address"
                    defaultValue=""
                >
                    <option value="" disabled>Select a garden address</option>
                    {gardenAddresses.map((address, index) => (
                        <option key={index} value={address[0]}>{address[0]}</option>
                    ))}
                </select>
            </label>
            <button className={styles.formButton} type="submit">ADD</button>
        </form>
    );
};

// export default DonationForm;