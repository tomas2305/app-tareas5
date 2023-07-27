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

export default function ResetPassword() {
  const navigate = useNavigate();
  const { resetPassword } = useAuthContext();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const handleClose = () => {
    navigate("/");
  };

  const handleChange = ({ target: { value } }) => setEmail(value);

  const handleReset = async e => {
    e.preventDefault();
    setError('');
    try {
        await resetPassword(email);
        console.log('Se mando el mail correctamente');
        navigate('/');
    } catch (error) {
        setError(error.message);
    }
  }

  return (
    <div>
      <Dialog fullWidth open={true} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <Box component="form" onSubmit={handleReset}>
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
              value={email}
            />
            {error && (
              <Alert sx={{ my: 2 }} severity="error">
                {error}
              </Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Link to="/login">
              <Button>Volver</Button>
            </Link>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Reestablecer </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
