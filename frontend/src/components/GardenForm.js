'use client'

import styles from '@/styles/DonationForm.module.css';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

/**
 * Function to validate alphanumeric input.
 * @param {string} input - The input string to validate.
 * @returns {boolean} True if the input is valid, otherwise false.
 */
const isValidInput = (input) => {
    const regex = /^[a-zA-Z0-9\s]*$/;
    return regex.test(input);
};

/**
 * GardenForm component for adding a new garden.
 * @param {Object} props - The component props.
 * @param {Function} props.callback - Callback function to refresh the gardens list.
 * @returns {JSX.Element} The GardenForm component.
 */
export default function GardenForm({ callback }) {
    const [alertMsg, setAlertMsg] = useState("");
    const [hasError, setHasError] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    /**
     * Handle form submission.
     * @param {Object} e - The event object.
     */
    const handleSubmit = async (e) => {
        setSubmitted(true);
        setHasError(false);
        setAlertMsg("");

        e.preventDefault();

        const et = e.target;

        const formData = {
            "address": et.address.value,
            "garden_name": et.gardenName.value,
            "num_of_plots": et.num_plots.value,
        }

        // Validate input
        if (!isValidInput(formData.address) || !isValidInput(formData.garden_name)) {
            setHasError(true);
            setAlertMsg("Address and Garden Name can only include alphanumeric characters and spaces.");
            return;
        }

        try {
            const response = await fetch('http://localhost:65535/api/gardens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }).then(resp => {
                if (resp.ok) {
                    setHasError(false);
                    setAlertMsg("Garden was added successfully!");
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
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                {hasError && <Alert severity="error">{alertMsg}</Alert>}
                {!hasError && alertMsg && <Alert severity="success">{alertMsg}</Alert>}
                {/* {hasError? <Alert severity={hasError? "error": "success"}>
                    {alertMsg}
                </Alert> : null} */}
                <h2 className={styles.formTitle}>Add a New Garden</h2>
                <label className={styles.formLabel}>
                    Address
                    <input
                        className={styles.formInput}
                        type="text"
                        name="address"
                        defaultValue=""
                    />
                </label>
                <label className={styles.formLabel}>
                    Garden Name
                    <input
                        className={styles.formInput}
                        type="text"
                        name="gardenName"
                        defaultValue=""
                    />
                </label>
                <label className={styles.formLabel}>
                    Number of Plots
                    <input
                        className={styles.formInput}
                        type="number"
                        name="num_plots"
                        defaultValue={0}
                        min="0"
                    />
                </label>
                <button className={styles.formButton} type="submit">ADD</button>
            </form>
        </div>
    );
};