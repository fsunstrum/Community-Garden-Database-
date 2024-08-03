'use client'

import styles from '@/styles/DonationForm.module.css';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

/**
 * Function to validate alphabetic name input.
 * @param {string} name - The name to be validated.
 * @returns {boolean} - Returns true if the name is valid, otherwise false.
 */
const isValidName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
};

/**
 * Function to validate phone number input (numbers and dashes only).
 * @param {string} phone - The phone number to be validated.
 * @returns {boolean} - Returns true if the phone number is valid, otherwise false.
 */
const isValidPhoneNumber = (phone) => {
    const regex = /^[0-9-]+$/;
    return regex.test(phone);
};

/**
 * GardenerForm component for adding a new gardener.
 * @param {Object} props - The component props.
 * @param {Function} props.callback - Callback function to refresh the gardener list.
 * @returns {JSX.Element} The GardenerForm component.
 */
export default function GardenerForm({callback}) {
    const [alertMsg, setAlertMsg] = useState("");
    const [hasError, setHasError] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    /**
     * Handle form submission.
     * @param {Object} e - The event object.
     */
    const handleSubmit = async (e) => {
        setSubmitted(true);

        e.preventDefault();

        const et = e.target;

        const formData = {
            "name": et.name.value,
            "email": et.email.value,
            "phone": et.phone.value,
        }


        // Validate input
        if (!isValidName(formData.name)) {
            setHasError(true);
            setAlertMsg("Name can only include alphabetic characters and spaces.");
            return;
        }
        if (!isValidPhoneNumber(formData.phone)) {
            setHasError(true);
            setAlertMsg("Phone number can only include numbers and dashes.");
            return;
        }

        try {
            const response = await fetch('http://localhost:65535/api/gardeners', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }).then(resp => {
                if (resp.ok) {
                    setHasError(false);
                    setAlertMsg("Gardener was added successfully!");
                    callback();
                } else return resp.json();
            });

            if (response) {
                setHasError(true);
                setAlertMsg(response.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setHasError(true);
            setAlertMsg('Failed to add gardener. Please try again.');
        }
    };

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                {submitted? <Alert severity={hasError? "error": "success"}>
                    {alertMsg}
                </Alert> : null}
                <h2 className={styles.formTitle}>Add a New Gardener</h2>
                <label className={styles.formLabel}>
                    Name
                    <input
                        className={styles.formInput}
                        type="text"
                        name="name"
                        defaultValue=""
                    />
                </label>
                <label className={styles.formLabel}>
                    Email address
                    <input
                        className={styles.formInput}
                        type="email"
                        name="email"
                        defaultValue=""
                    />
                </label>
                <label className={styles.formLabel}>
                    Phone number
                    <input
                        className={styles.formInput}
                        type="tel"
                        name="phone"
                    />
                </label>
                <button className={styles.formButton} type="submit">ADD</button>
            </form>
        </div>
    );
};