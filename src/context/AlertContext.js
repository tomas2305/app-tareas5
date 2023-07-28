import React, { createContext, useContext, useState } from "react";
import FixedAlert from "../components/FixedAlert";

const alertContext = createContext();
export const useAlertContext = () => useContext(alertContext);

export function AlertProvider({ children }) {
  const [message, setMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [open, setOpen] = useState(false);

  const sendAlert = (message, severity) => {
    setAlertSeverity("info");
    setMessage(message);
    if (severity) setAlertSeverity(severity);
    setOpen(true);
  };

  return (
    <alertContext.Provider value={{ sendAlert }}>
      {message && (
        <FixedAlert
          setOpen={setOpen}
          open={open}
          message={message}
          severity={alertSeverity}
        />
      )}
      {children}
    </alertContext.Provider>
  );
}
