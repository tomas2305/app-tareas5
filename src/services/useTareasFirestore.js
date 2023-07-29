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

  const addTarea = (tarea) => setDoc(doc(tareasRef, tarea.id), tarea);

  const deleteTarea = (id) => {
    const tareaRef = doc(userRef, "tareas", id);
    return deleteDoc(tareaRef);
  };

  return { loading, getTareas, addTarea, deleteTarea };
}
