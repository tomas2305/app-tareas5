import { AppBar, Container, Grid, Toolbar, Typography } from "@mui/material";
import React from "react";
import Tarea from "./Tarea";
import { useTheme } from "@emotion/react";
import FormTarea from "./FormTarea";
import useTareasFirestore from "../services/useTareasFirestore";


export default function Tareas() {
  const { tareas,  addTarea, deleteTarea, tacharTarea} = useTareasFirestore();

  const theme = useTheme();
  const secondary = theme.palette.secondary.dark;

  
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
            <Grid key={tarea.id} item xs={3} >
              <Tarea
                tacharTarea={tacharTarea}
                deleteTarea={deleteTarea}
                isTachada = {tarea.isTachada}
                id={tarea.id}
                tarea={tarea}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
