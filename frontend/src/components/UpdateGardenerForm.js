import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { styled } from '@mui/system';

// Custom styled Button component
const CustomAddButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#505050',
    color: 'white',
    '&:hover': {
        backgroundColor: '#548060',
    },
}));

/**
 * Function to validate alphabetic name input.
 * @param {string} name - The name to validate.
 * @returns {boolean} - True if the name is valid, false otherwise.
 */
const isValidName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
};

/**
 * Function to validate phone number input (numbers and dashes only).
 * @param {string} phone - The phone number to validate.
 * @returns {boolean} - True if the phone number is valid, false otherwise.
 */
const isValidPhoneNumber = (phone) => {
    const regex = /^[0-9-]+$/;
    return regex.test(phone);
};

/**
 * Component for updating gardener information.
 * @param {Object} props - The component props.
 * @param {Array} props.gardener - The gardener data.
 * @param {Function} props.callback - The callback function to refresh the gardener list.
 * @param {Function} props.onClose - The function to close the edit modal.
 * @returns {JSX.Element} The UpdateGardenerForm component.
 */
export default function UpdateGardenerForm({ gardener, callback, onClose }) {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [hasError, setHasError] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    // Effect hook to set initial gardener data when the component mounts.
    useEffect(() => {
        if (gardener) {
            setEmail(gardener[1]);
            setPhone(gardener[2]);
            setName(gardener[0]);
        }
    }, [gardener]);

    /**
     * Handle form submission to update gardener information.
     * @param {React.FormEvent} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasError(false);
        setAlertMsg('');

        const data = {
            email: email,
            phone: phone,
            name: name,
        };

        // Validate input
        if (!isValidName(data.name)) {
            setHasError(true);
            setAlertMsg("Name can only include alphabetic characters and spaces.");
            return;
        }
        if (!isValidPhoneNumber(data.phone)) {
            setHasError(true);
            setAlertMsg("Phone number can only include numbers and dashes.");
            return;
        }

        try {
            const res = await fetch('http://localhost:65535/api/gardeners', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            }).then(res => {
                if (!res.ok) {
                    setHasError(true);
                    setAlertMsg(response.message);
                } else {
                    setHasError(false);
                    setAlertMsg('Gardener updated successfully!');
                    callback();
                    onClose();
                }
            });
            if (res) {
                setAlertMsg(res.message);
                setAlertMsg(response.message);
            }
        } catch (err) {
            console.error(err);
            setHasError(true);
            setAlertMsg('A gardener with the same name and phone number already exists. Please try again.');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            {alertMsg && <Alert severity={hasError ? 'error' : 'success'}>{alertMsg}</Alert>}
            <TextField
                fullWidth
                margin="normal"
                label="Email"
                value={email}
                disabled
            />
            <TextField
                fullWidth
                margin="normal"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <CustomAddButton variant="contained" color="primary" type="submit">
                Update Gardener
            </CustomAddButton>
        </Box>
    );
}
