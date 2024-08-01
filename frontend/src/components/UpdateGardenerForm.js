import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { styled } from '@mui/system';

const CustomAddButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#505050', 
    color: 'white',
    '&:hover': {
      backgroundColor: '#548060',
    },
  }));

export default function UpdateGardenerForm({ gardener, callback, onClose }) {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [hasError, setHasError] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    useEffect(() => {
        if (gardener) {
            setEmail(gardener[1]);
            setPhone(gardener[2]);
            setName(gardener[0]);
        }
    }, [gardener]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasError(false);
        setAlertMsg('');

        const data = {
            email: email,
            phone: phone,
            name: name,
        };

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
