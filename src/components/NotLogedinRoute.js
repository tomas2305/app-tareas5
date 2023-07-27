import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

export default function NotLogedinRoute({ children }) {
  const { user, loading } = useAuthContext();

  if(loading) return <Loading/>

  if(user) return <Navigate to={'/'}/>

  return <>{children}</>
}
