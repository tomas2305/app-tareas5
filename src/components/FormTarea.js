import { serverTimestamp } from "firebase/firestore";
import { Box, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function FormTarea(props) {
  const [input, setInput] = useState("");

  function changeInput(event) {
    setInput(event.target.value);
  }

  function addTarea(event) {
    event.preventDefault();
    const newID = uuidv4();
    const fecha = serverTimestamp();
    props.addTarea({
      id: newID,
      fechaCreacion: fecha,
      input: input,
      isTachada: false,
    });
    setInput("");
  }

  return (
    <Box component="form" onSubmit={addTarea} sx={{ width: "40%" }}>
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
