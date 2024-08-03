import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import UpdateGardenerForm from './UpdateGardenerForm';

/**
 * GardenerEditModal component renders a modal dialog for editing gardener information.
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Boolean indicating whether the modal is open.
 * @param {Function} props.onClose - Function to handle closing the modal.
 * @param {Object} props.gardener - The gardener data to be edited.
 * @param {Function} props.callback - Function to be called after the gardener is edited.
 * @returns {JSX.Element} The GardenerEditModal component.
 */
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
