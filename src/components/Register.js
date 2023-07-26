import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const theme = useTheme();
  const secondary = theme.palette.secondary;

  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleClose = e => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Registrarse</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            autoComplete="true"
            fullWidth
            variant="standard"
          />
          <Link to="/resetpassword">
            <Button size="small">Reestablecer Contraseña</Button>
          </Link>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Registrarse</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
