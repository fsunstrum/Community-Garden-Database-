'use client'

import styles from '@/styles/DonationForm.module.css';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

export default function GardenerForm({callback}) {
    const [alertMsg, setAlertMsg] = useState("");
    const [hasError, setHasError] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        setSubmitted(true);

        e.preventDefault();

        const et = e.target;

        const formData = {
            "name": et.name.value,
            "email": et.email.value,
            "phone": et.phone.value,
            // "manager_email": et.email.value
        }

        console.log(formData);

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