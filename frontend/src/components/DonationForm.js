'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/DonationForm.module.css';
import Alert from '@mui/material/Alert';

/**
 * Validate numeric input for Donation ID.
 * @param {string} id - The donation ID to validate.
 * @returns {boolean} True if the ID is valid, false otherwise.
 */
const isValidDonationId = (id) => {
    const regex = /^[0-9]+$/;
    return regex.test(id);
};

/**
 * Validate alphabetic name input.
 * @param {string} name - The name to validate.
 * @returns {boolean} True if the name is valid, false otherwise.
 */
const isValidName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
};

/**
 * Validate alphanumeric input for item.
 * @param {string} item - The item to validate.
 * @returns {boolean} True if the item is valid, false otherwise.
 */
const isValidItem = (item) => {
    const regex = /^[a-zA-Z0-9\s]+$/;
    return regex.test(item);
};

/**
 * DonationForm component handles the donation form functionality.
 * @param {Object} props - The component props.
 * @param {Function} props.callback - The callback function to refresh donations list.
 * @returns {JSX.Element} The DonationForm component.
 */
export default function DonationForm({ callback }) {
    const [alertMsg, setAlertMsg] = useState("");
    const [hasError, setHasError] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [gardenAddresses, setGardenAddresses] = useState([]);

    // Fetch garden addresses when the component mounts
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

    /**
     * Handle form submission.
     * @param {Object} e - The event object.
     */
    const handleSubmit = async (e) => {
        setSubmitted(true);

        e.preventDefault();

        const et = e.target;

        // Gather form data
        const formData = {
            "donation_id": et.donation_id.value,
            "donor_name": et.donor_name.value,
            "don_date": et.don_date.value,
            "item": et.item.value,
            "garden_address": et.garden_address.value
        }

        // Validate input
        if (!isValidDonationId(formData.donation_id)) {
            setHasError(true);
            setAlertMsg("Donation ID can only include numbers.");
            return;
        }
        if (!isValidName(formData.donor_name)) {
            setHasError(true);
            setAlertMsg("Name can only include alphabetic characters and spaces.");
            return;
        }
        if (!isValidItem(formData.item)) {
            setHasError(true);
            setAlertMsg("Item can only include alphanumeric characters and spaces.");
            return;
        }
        
        try {
            // Send POST request to the API to create a new donation
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
                    callback(); // callback to refresh the donations list
                } else return resp.json();
            });

            // Handle error messages
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
                />
            </label>
            <label className={styles.formLabel}>
                Name
                <input
                    className={styles.formInput}
                    type="text"
                    name="donor_name"
                    defaultValue=""
                />
            </label>
            <label className={styles.formLabel}>
                Date
                <input
                    className={styles.formInput}
                    type="date"
                    name="don_date"
                    defaultValue=""
                />
            </label>
            <label className={styles.formLabel}>
                Item
                <input
                    className={styles.formInput}
                    type="text"
                    name="item"
                    defaultValue=""
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

