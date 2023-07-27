import { useEffect, useState } from "react";
import {db} from "../firebase";
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

export default function useTareasFirestore() {
  const {user} = useAuthContext()
  const userRef = doc(db, 'usuarios', user.email);
  const tareasRef = collection(userRef, "tareas");

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
    await setDoc(doc(tareasRef, tarea.id), tarea);
  }

  function deleteTarea(id) {
    const tareaRef = doc(db, "tareas", id);
    deleteDoc(tareaRef);
  }

  function tacharTarea(tarea) {
    setDoc(doc(tareasRef, tarea.id), tarea);
  }

  

  return {getTareas, addTarea, deleteTarea, tacharTarea };
}
