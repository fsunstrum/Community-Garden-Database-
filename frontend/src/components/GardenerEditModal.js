import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import UpdateGardenerForm from './UpdateGardenerForm';

export default function GardenerEditModal({ open, onClose, gardener, callback }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Gardener</DialogTitle>
            <DialogContent>
                <UpdateGardenerForm gardener={gardener} callback={callback} onClose={onClose} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
