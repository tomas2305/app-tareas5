import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Tarea from "./Tarea";
import useTareasFirestore from "../services/useTareasFirestore";
import FormTarea from "./FormTarea";
import OpenIconSpeedDial from "./Dial";
import Loading from "./Loading";
import { useAlertContext } from "../context/AlertContext";
import ConfirmAlert from "./ConfirmAlert";

export default function Tareas() {
  const { loading, addTarea, getTareas, deleteTarea } =
    useTareasFirestore();
  const [tareas, setTareas] = useState([]);
  const {sendAlert} = useAlertContext();
  const [openAddTareas, setOpenAddTareas] = useState(false);
  const [confirm, setConfirm] = useState(<></>);

  useEffect(() => {
    const tareasDB = getTareas();
    tareasDB.then((tareas) => {
      tareas.forEach((tarea, index) => {
        const tiempo = 300 * (index + 1);
        tarea.timeTarea = tiempo;
      });
      setTareas(tareas);
    });

    console.log("efect");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleAddTarea(tarea) {
    setTareas([...tareas, tarea]);
    try {
      await addTarea(tarea);
      sendAlert("Tarea agregada");
    } catch (error) {
      sendAlert(error.message, "danger");
    }
  }

  const handleDeleteTarea = async (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
    try {
      await deleteTarea(id);
      sendAlert("Tarea Borrada");
    } catch (error) {
      sendAlert(error.message, "danger");
    }
  }

  const handleTacharTarea = async tarea => {
    try {
      await addTarea(tarea);
      sendAlert("Tarea Cambiada");
    } catch (error) {
      sendAlert(error.message, "danger");
    }
  }

  const deleteAllTareas = () => {
    setConfirm(<ConfirmAlert/>);
    tareas.forEach(tarea => handleDeleteTarea(tarea.id));
  }

  const tacharAllTareas = isTachada => {
    const tareasTachadas = [];
    tareas.forEach(tarea =>{ 
      tarea.isTachada = isTachada;
      tareasTachadas.push(tarea);
      handleTacharTarea(tarea);
    });
    setTareas(tareasTachadas);
  }



  return (
    <>
      {loading && <Loading />}
      <FormTarea
        addTarea={handleAddTarea}
        open={openAddTareas}
        setOpenAddTareas={setOpenAddTareas}
      />
      {confirm}
      <Grid container spacing={4} mb={4}>
        {tareas.map((tarea) => (
          <Grid key={tarea.id} item xs={3}>
            <Tarea
              tacharTarea={handleTacharTarea}
              deleteTarea={handleDeleteTarea}
              tarea={tarea}
              isTachadaProp={tarea.isTachada}
            />
          </Grid>
        ))}
      </Grid>
      <OpenIconSpeedDial deleteAllTareas={deleteAllTareas} tacharAllTareas={tacharAllTareas} setOpenAddTareas={setOpenAddTareas} />
    </>
  );
}
