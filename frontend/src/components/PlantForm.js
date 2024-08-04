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
 * PlantForm component for adding a new plant.
 * @param {Object} props - The component props.
 * @param {Function} props.callback - Callback function to refresh the plants list.
 * @returns {JSX.Element} The PlantForm component.
 */
export default function PlantForm({ callback }) {
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
            common_name: et.commonName.value,
            colour: et.colour.value,
            harvest_time: et.harvestTime.value,
            species: et.species.value,
            genus: et.genus.value,
            variety: et.variety.value
        };

        // Validate input
        if (!isValidInput(formData.common_name) || !isValidInput(formData.colour) || !isValidInput(formData.harvest_time) || !isValidInput(formData.species) || !isValidInput(formData.genus) || !isValidInput(formData.variety)) {
            setHasError(true);
            setAlertMsg("All fields can only include alphanumeric characters and spaces.");
            return;
        }

        try {
            const response = await fetch('http://localhost:65535/api/plants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }).then(resp => {
                if (resp.ok) {
                    setHasError(false);
                    setAlertMsg("Plant was added successfully!");
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
                <h2 className={styles.formTitle}>Add a New Plant</h2>
                <label className={styles.formLabel}>
                    Common Name
                    <input
                        className={styles.formInput}
                        type="text"
                        name="commonName"
                        defaultValue=""
                    />
                </label>
                <label className={styles.formLabel}>
                    Colour
                    <input
                        className={styles.formInput}
                        type="text"
                        name="colour"
                        defaultValue=""
                    />
                </label>
                <label className={styles.formLabel}>
                    Harvest Time
                    <input
                        className={styles.formInput}
                        type="text"
                        name="harvestTime"
                        defaultValue=""
                    />
                </label>
                <label className={styles.formLabel}>
                    Species
                    <input
                        className={styles.formInput}
                        type="text"
                        name="species"
                        defaultValue=""
                    />
                </label>
                <label className={styles.formLabel}>
                    Genus
                    <input
                        className={styles.formInput}
                        type="text"
                        name="genus"
                        defaultValue=""
                    />
                </label>
                <label className={styles.formLabel}>
                    Variety
                    <input
                        className={styles.formInput}
                        type="text"
                        name="variety"
                        defaultValue=""
                    />
                </label>
                <button className={styles.formButton} type="submit">ADD</button>
            </form>
        </div>
    );
};
