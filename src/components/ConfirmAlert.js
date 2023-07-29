import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function ConfirmAlert({ action, message, cancel }) {
  const [open, setOpen] = useState(true);

  function handleClose() {
    setOpen(false);
    cancel();
  }

  function handleConfirm(event) {
    setOpen(false);
    action();
  }

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>Confirme</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleConfirm}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
