import React, { useRef, useState } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Button, Grid, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function GardenTable({ gardeners, onEdit, callback }) {

    const checkboxesRef = useRef([]);

    const [alertMsg, setAlertMsg] = useState("");
    const [hasError, setHasError] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleRemoveSelected = async (e) => {
        // console.log('Checkboxes Ref:', checkboxesRef.current);

        setSubmitted(true);

        e.preventDefault();

        const et = e.target;

        const selectedIndices = checkboxesRef.current.map((checkbox, idx) => checkbox.checked ? idx : null).filter(idx => idx !== null);
        const selectedEmails = selectedIndices.map(idx => {
            const email = gardeners[idx] && gardeners[idx][1];
            // console.log(`Index ${idx} email: ${email}`);
            return email;
        });
        console.log('Checkboxes Ref:', checkboxesRef.current);
        console.log('Selected Indices:', selectedIndices);

        console.log('Selected Emails:', selectedEmails);

        try {
            const response = await fetch('http://localhost:65535/api/gardeners', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emails: selectedEmails }),
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

            checkboxesRef.current.forEach(checkbox => checkbox.checked = false);

        } catch (err) {
            console.error('Error:', err);
        }

    }



    const tableRows = gardeners.map((row, idx) => (
        <TableRow key={idx}>
            {row.map((v, i) => <TableCell key={i}>{v}</TableCell>)}
            <TableCell>
                <Checkbox
                    // ref={el => checkboxesRef.current[idx] = el}
                    inputRef={el => checkboxesRef.current[idx] = el}
                // checked = {selectedRows.includes(idx)}
                />
            </TableCell>
            <TableCell>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(gardeners[idx])}>
                    Edit
                </Button>
            </TableCell>
        </TableRow>
    ))

    return (

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>E-mail address</TableCell>
                        <TableCell>Phone number</TableCell>
                        {/* <TableCell>Manager Email</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableRows}
                </TableBody>
            </Table>
            <Grid container justifyContent="flex-end">
                <Button variant="default" startIcon={<DeleteIcon />} onClick={handleRemoveSelected} >
                    Remove Selected Gardeners
                </Button>
            </Grid>
        </TableContainer>



    )
}