import { Container, Grid } from "@mui/material";
import React from "react";
import Tarea from "./Tarea";
import useTareasFirestore from "../services/useTareasFirestore";

export default function Tareas() {
  const { tareas, deleteTarea, tacharTarea } = useTareasFirestore();

  return (
    <>
      <Container className="App">
        <Grid container spacing={4}>
          {tareas.map((tarea) => (
            <Grid key={tarea.id} item xs={3}>
              <Tarea
                tacharTarea={tacharTarea}
                deleteTarea={deleteTarea}
                isTachada={tarea.isTachada}
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
