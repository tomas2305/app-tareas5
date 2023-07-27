import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Box } from "@mui/material";
import { useAuthContext } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { signup } = useAuthContext();
  const [validePassword, setValidePassword] = useState(false);
  const [confirmStyles, setConfirmStyles] = useState({});
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nombre: "",
    apellido: "",
  });

  const handleClose = (e) => {
    navigate("/");
  };

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
    console.log("change");

    const voidCondition = value !== "";
    const confirmCondition = name === "confirmPassword" && voidCondition;
    const passwordCondition = name === "password" && voidCondition;

    if (
      (confirmCondition && user.password === value) ||
      (passwordCondition && user.confirmPassword === value)
    ) {
      setValidePassword(true);
      setConfirmStyles({ color: "success", focused: true });
    } else if (confirmCondition || passwordCondition) {
      setValidePassword(false);
      setConfirmStyles({ error: true });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Dialog fullWidth open={true} onClose={handleClose}>
        <DialogTitle>Registrarse</DialogTitle>
        <Box onSubmit={handleRegister} component="form">
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="nombre"
              name="nombre"
              label="Nombre"
              type="nombre"
              fullWidth
              variant="standard"
              onChange={handleChange}
              value={user.nombre}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="apellido"
              name="apellido"
              label="Apellido"
              type="apellido"
              fullWidth
              variant="standard"
              onChange={handleChange}
              value={user.apellido}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              onChange={handleChange}
              value={user.email}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              autoComplete="true"
              fullWidth
              variant="standard"
              onChange={handleChange}
              value={user.password}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="confirmPassword"
              name="confirmPassword"
              label="Repetir Contraseña"
              type="password"
              autoComplete="true"
              fullWidth
              variant="standard"
              onChange={handleChange}
              value={user.confirmPassword}
              required
              {...confirmStyles}
            />

            {error && (
              <Alert sx={{ my: 2 }} severity="error">
                {error}
              </Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={!validePassword} type="submit">
              Registrarse
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
