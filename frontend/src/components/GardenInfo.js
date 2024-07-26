'use client'

import styles from '@/styles/DonationForm.module.css';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function GardenForm({ data, hasError, errorMsg }) {
    return (
        <Stack>
            <Item>{hasError ? <Alert severity={"error"}>{errorMsg}</Alert> : null}</Item>
            <Item>Garden Address: {data[0]}</Item>
            <Item>Garden Name: {data[1]}</Item>
        </Stack>
    );
};