import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialogSubscribe({ open, handleClose, handleConfirm }) {
    console.log(open);
    return (
        <div>
            <Dialog open={open} onClose={() => handleClose()} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{'Subscribe to new workout plan?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        We found that you already have an existing subscription for this month. If you subscribe now all existing data about your
                        previous subscription will be lost.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose()} color="primary">
                        Don't subscribe
                    </Button>
                    <Button onClick={() => handleConfirm()} color="primary" autoFocus>
                        Subscribe anyway
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
