import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Tarea from "./Tarea";
import useTareasFirestore from "../services/useTareasFirestore";
import FormTarea from "./FormTarea";
import OpenIconSpeedDial from "./Dial";
import Loading from "./Loading";

export default function Tareas() {
  const { loading, addTarea, getTareas, deleteTarea, tacharTarea } =
    useTareasFirestore();
  const [tareas, setTareas] = useState([]);
  const [openAddTareas, setOpenAddTareas] = useState(false);

  useEffect(() => {
    const tareasDB = getTareas();
    tareasDB.then((tareas) => {
      setTareas(tareas);
    });
    console.log("efect");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleAddTarea(tarea) {
    setTareas([...tareas, tarea]);
    await addTarea(tarea);
  }

  function handleDeleteTarea(id) {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
    deleteTarea(id);
  }

  return (
    <>
    {loading && <Loading/>}
      <FormTarea
        addTarea={handleAddTarea}
        open={openAddTareas}
        setOpenAddTareas={setOpenAddTareas}
      />
      <Grid container spacing={4}>
        {tareas.map((tarea) => (
          <Grid key={tarea.id} item xs={3}>
            <Tarea
              tacharTarea={tacharTarea}
              deleteTarea={handleDeleteTarea}
              isTachada={tarea.isTachada}
              id={tarea.id}
              tarea={tarea}
            />
          </Grid>
        ))}
      </Grid>
      <OpenIconSpeedDial setOpenAddTareas={setOpenAddTareas} />
    </>
  );
}
