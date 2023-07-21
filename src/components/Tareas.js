import { AppBar, Container, Grid, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import Tarea from "./Tarea";
import { useTheme } from "@emotion/react";
import FormTarea from "./FormTarea";

export default function Tareas() {
  const [tareas, setTareas] = useState([]);

  const theme = useTheme();
  const secondary = theme.palette.secondary.dark;

  function addTarea(tarea) {
    setTareas([...tareas, tarea]);
  }

  function deleteTarea(id) {
    setTareas(tareas.filter(tarea => tarea.id !== id))
  }

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: secondary }}>
        <Toolbar>
          <Typography variant="h5" textAlign="left" mr={4}>
            App Tareas
          </Typography>
          <FormTarea addTarea={addTarea} />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container className="App">
        <Grid container spacing={4}>
          {tareas.map((tarea) => (
            <Grid item xs={3} key={tarea.id}>
              <Tarea
                deleteTarea={deleteTarea}
                id={tarea.id}
                input={tarea.input}
                isTachada={tarea.isTachada}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
