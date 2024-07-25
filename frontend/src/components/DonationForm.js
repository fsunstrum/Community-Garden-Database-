"use client";

import { useState } from 'react';
import styles from '../styles/DonationForm.module.css';

const DonationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        donationId: '',
        item: '',
        // gardenAddress: '',
        date: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:65535/api/donations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Donation added successfully');
            } else {
                console.error('Failed to add donation');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.formTitle}>Make a Donation!</h2>
            <label className={styles.formLabel}>
                Name
                <input
                    className={styles.formInput}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </label>
            <label className={styles.formLabel}>
                Donation ID
                <input
                    className={styles.formInput}
                    type="text"
                    name="donationId"
                    value={formData.donationId}
                    onChange={handleChange}
                />
            </label>
            <label className={styles.formLabel}>
                Item
                <input
                    className={styles.formInput}
                    type="text"
                    name="item"
                    value={formData.item}
                    onChange={handleChange}
                />
            </label>
            {/* <label className={styles.formLabel}>
                Garden Address
                <input
                    className={styles.formInput}
                    type="text"
                    name="gardenAddress"
                    value={formData.gardenAddress}
                    onChange={handleChange}
                />
            </label> */}
            <label className={styles.formLabel}>
                Date
                <input
                    className={styles.formInput}
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />
            </label>
            <button className={styles.formButton} type="submit">ADD</button>
        </form>
    );
};

export default DonationForm;