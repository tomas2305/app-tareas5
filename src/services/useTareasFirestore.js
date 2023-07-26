import { useEffect, useState } from "react";
import db from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";

export default function useTareasFirestore() {
  const tareasRef = collection(db, "tareas");
  const [tareas, setTareas] = useState([]);

  const getTareas = async () => {
    const consultaOrdenada = query(tareasRef, orderBy("fechaCreacion", "asc"));
    const tareasDocs = await getDocs(consultaOrdenada);
    const tareasDB = [];
    tareasDocs.forEach((doc) => {
      const datos = doc.data();
      tareasDB.push(datos);
    });
    console.log("getData");
    return tareasDB;
  };

  async function addTarea(tarea) {
    setTareas([...tareas, tarea]);
    await setDoc(doc(tareasRef, tarea.id), tarea);
  }

  function deleteTarea(id) {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
    const tareaRef = doc(db, "tareas", id);
    deleteDoc(tareaRef);
  }

  function tacharTarea(tarea) {
    setDoc(doc(tareasRef, tarea.id), tarea);
  }

  useEffect(() => {
    const tareasDB = getTareas();
    tareasDB.then((tareas) => {
      setTareas(tareas);
    });
    console.log("efect");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { tareas, getTareas, addTarea, deleteTarea, tacharTarea };
}
