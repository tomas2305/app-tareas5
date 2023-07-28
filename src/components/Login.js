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
import { useAlertContext } from "../context/AlertContext";

export default function Login() {
  const {sendAlert} = useAlertContext();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const {login} = useAuthContext();
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => navigate("/"), 400)
  };

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleLogin = async e => {
    e.preventDefault();    
    try {
      await login(user.email, user.password);
      navigate('/');
      sendAlert('Ingreso correctamente', 'success');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <Box component="form" onSubmit={handleLogin}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              required
              onChange={handleChange}
              value={user.email}
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="true"
              fullWidth
              variant="standard"
              required
              onChange={handleChange}
              value={user.password}
            />
             {error && (
              <Alert sx={{ my: 2 }} severity="error">
                {error}
              </Alert>
            )}
            <Link to="/resetpassword">
              <Button size="small">Reestablecer Contraseña</Button>
            </Link>
            <Link to="/register">
              <Button size="small">Registrarse</Button>
            </Link>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">
              LOGIN
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
