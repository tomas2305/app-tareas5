import { serverTimestamp } from "firebase/firestore";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function FormTarea({ addTarea, open, setOpenAddTareas }) {
  const [input, setInput] = useState("");

  function changeInput(event) {
    setInput(event.target.value);
  }

  function handleClose() {
    setOpenAddTareas(false);
  }

  function handleAddTarea(event) {
    event.preventDefault();
    const newID = uuidv4();
    const fecha = serverTimestamp();
    addTarea({
      id: newID,
      fechaCreacion: fecha,
      input: input,
      isTachada: false,
    });
    setInput("");
    handleClose();
  }

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>Nueva Tarea</DialogTitle>
      <Box component="form" onSubmit={handleAddTarea}>
        <DialogContent>
          <TextField
            fullWidth
            size="small"
            label="Nueva Tarea"
            variant="filled"
            inputMode="text"
            value={input}
            onChange={changeInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!input} type="submit">
            Añadir Tarea
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
