import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function ConfirmAlert({ action }) {
  const [open, setOpen] = useState(true);

  function handleClose() {
    setOpen(false);
  }

  function handleConfirm(event) {
    action()
  }

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>Confirme</DialogTitle>
        <DialogContent>
          <Typography variant="h2">Esta seguro?</Typography>
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
