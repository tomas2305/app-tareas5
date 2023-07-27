import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { createContext, useContext } from "react";
import { auth } from "../firebase";

const authContext = createContext();

export const useAuthContext = () => useContext(authContext);

export function AuthProvider({children}) {
  const signup = (user) =>
    createUserWithEmailAndPassword(auth, user.email, user.password);

  return <authContext.Provider value={{signup}}>{children}</authContext.Provider>;
}
