import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialogCreateWorkout({ open, handleClose, handleConfirm }) {
    // console.log(open);
    return (
        <div>
            <Dialog open={open} onClose={() => handleClose()} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{'Make this workout plan public?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you choose to make this workout plan public, other users can find it and subscribe to it. Otherwise, the workout plan will
                        be private and only you can find and subscribe to this workout plan.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose()} color="primary">
                        Keep it private
                    </Button>
                    <Button onClick={() => handleConfirm()} color="primary" autoFocus>
                        Make it public
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
