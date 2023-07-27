import { serverTimestamp } from "firebase/firestore";
import { Box, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useTareasFirestore from "../services/useTareasFirestore";

export default function FormTarea() {
  const [input, setInput] = useState("");
  const {addTarea} = useTareasFirestore();

  function changeInput(event) {
    setInput(event.target.value);
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
    <Box component="form" onSubmit={handleAddTarea} sx={{ width: "40%" }}>
      <FormControl fullWidth>
        <TextField
          size="small"
          label="Nueva Tarea"
          variant="filled"
          inputMode="text"
          value={input}
          onChange={changeInput}
        />
      </FormControl>
    </Box>
  );
}
