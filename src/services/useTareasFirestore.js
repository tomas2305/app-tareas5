import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useAlertContext } from "../context/AlertContext";

export default function useTareasFirestore() {
  const { sendAlert } = useAlertContext();
  const { user } = useAuthContext();
  const userRef = doc(db, "usuarios", user.email);
  const tareasRef = collection(userRef, "tareas");
  const [loading, setLoading] = useState(true);

  const getTareas = async () => {
    const consultaOrdenada = query(tareasRef, orderBy("fechaCreacion", "asc"));
    const tareasDocs = await getDocs(consultaOrdenada);
    const tareasDB = [];
    tareasDocs.forEach((doc) => {
      const datos = doc.data();
      tareasDB.push(datos);
    });
    setLoading(false);
    return tareasDB;
  };

  async function addTarea(tarea) {
    try {
      await setDoc(doc(tareasRef, tarea.id), tarea);
      sendAlert("Tarea agregada");
    } catch (error) {
      sendAlert(error.message, "danger");
    }
  }

  const deleteTarea = async (id) => {
    const tareaRef = doc(userRef, "tareas", id);
    try {
      await deleteDoc(tareaRef);
      sendAlert("Tarea Borrada");
    } catch (error) {
      sendAlert(error.message, "danger");
    }
  };

  const tacharTarea = async (tarea) => {
    try {
      await setDoc(doc(tareasRef, tarea.id), tarea);
      sendAlert("Tarea Tachada");
    } catch (error) {
      sendAlert(error.message, "danger");
    }
  };

  return { loading, getTareas, addTarea, deleteTarea, tacharTarea };
}
