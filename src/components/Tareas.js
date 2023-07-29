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
  const { loading, addTarea, getTareas, deleteTarea, updateTarea } =
    useTareasFirestore();
  const [tareas, setTareas] = useState([]);
  const { sendAlert } = useAlertContext();
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
    const newTareas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(newTareas);
    try {
      await deleteTarea(id);
      sendAlert("Tarea Borrada");
    } catch (error) {
      sendAlert(error.message, "danger");
    }
  };

  const handleDeleteTareas = async (tareasDel) => {
    tareasDel.forEach(async (tarea) => {
      try {
        await deleteTarea(tarea.id);
        sendAlert("Tarea Borrada");
      } catch (error) {
        sendAlert(error.message, "danger");
      }
    });
  };

  const handleTacharTarea = async (tarea) => {
    try {
      await updateTarea(tarea.id, "isTachada", tarea.isTachada);
      const index = tareas.findIndex((tareaFind) => tareaFind.id === tarea.id);
      tareas[index] = tarea;
      sendAlert("Tarea Cambiada");
    } catch (error) {
      sendAlert(error.message, "danger");
    }
  };

  const deleteAllTareas = () => {
    setConfirm(
      <ConfirmAlert
        cancel={() => setConfirm(<></>)}
        action={async () => {
          setTareas([]);
          handleDeleteTareas(tareas);
          setConfirm(<></>);
        }}
        message={"¿Estas seguro que quieres borrar todas las tareas?"}
      />
    );
  };

  const deleteAllTareasTachadas = () => {
    setConfirm(
      <ConfirmAlert
        cancel={() => setConfirm(<></>)}
        action={() => {
          const tareasDelete = [];
          const newTareas = [];
          tareas.forEach((tarea) => {
            if (tarea.isTachada) {
              tareasDelete.push(tarea);
            } else {
              newTareas.push(tarea);
            }
          });
          setTareas(newTareas);
          handleDeleteTareas(tareasDelete);
          setConfirm(<></>);
        }}
        message={"¿Estas seguro que quieres borrar todas las tareas tachadas?"}
      />
    );
  };

  const tacharAllTareas = () => {
    setConfirm(
      <ConfirmAlert
        cancel={() => setConfirm(<></>)}
        action={() => {
          const tareasTachadas = [];
          tareas.forEach((tarea) => {
            tarea.isTachada = true;
            tareasTachadas.push(tarea);
            handleTacharTarea(tarea);
          });
          setTareas(tareasTachadas);
          setConfirm(<></>);
        }}
        message={"¿Estas seguro que quieres tachar todas las tareas?"}
      />
    );
  };

  const destacharAllTareas = () => {
    setConfirm(
      <ConfirmAlert
        cancel={() => setConfirm(<></>)}
        action={() => {
          const tareasTachadas = [];
          tareas.forEach((tarea) => {
            tarea.isTachada = false;
            tareasTachadas.push(tarea);
            handleTacharTarea(tarea);
          });
          setTareas(tareasTachadas);
          setConfirm(<></>);
        }}
        message={"¿Estas seguro que quieres destachar todas las tareas?"}
      />
    );
  };

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
      <OpenIconSpeedDial
        deleteAllTareas={deleteAllTareas}
        deleteAllTareasTachadas={deleteAllTareasTachadas}
        tacharAllTareas={tacharAllTareas}
        destacharAllTareas={destacharAllTareas}
        setOpenAddTareas={setOpenAddTareas}
      />
    </>
  );
}
