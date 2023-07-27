import { serverTimestamp } from "firebase/firestore";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";

export default function FormTarea({addTarea}) {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [error, setError] = useState('');

  function changeInput(event) {
    setInput(event.target.value);
  }

  function handleClose(){
    navigate('/')
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
  }

  return (
    <Dialog fullWidth open={false} onClose={handleClose}>
    <DialogTitle>Registrarse</DialogTitle>
    <Box component="form" onSubmit={handleAddTarea}>
      <DialogContent>
      <TextField
          size="small"
          label="Nueva Tarea"
          variant="filled"
          inputMode="text"
          value={input}
          onChange={changeInput}
        />
        {error && (
          <Alert sx={{ my: 2 }} severity="error">
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">
          Añadir Tarea
        </Button>
      </DialogActions>
    </Box>
  </Dialog>
  );
}
