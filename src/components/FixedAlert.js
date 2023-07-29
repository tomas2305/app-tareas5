import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import { Alert } from '@mui/material';

export default function FixedAlert({open, setOpen, message, severity}) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        message="I love snacks"
        key={Fade.name}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </div>
  );
}
