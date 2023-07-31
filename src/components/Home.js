import {
  AppBar,
  Box,
  Button,
  Container,
  Grow,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import Tareas from "./Tareas";
import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import homeImage from "../assets/home.png";
import { useAlertContext } from "../context/AlertContext";

export default function Home() {
  const {sendAlert} = useAlertContext();
  const theme = useTheme();
  const secondary = theme.palette.secondary.dark;
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
      sendAlert('Se cerro sesión correctamente', 'success');
    } catch (error) {
      sendAlert(error.message, 'error');
    }
  };

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: secondary }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Grow in timeout={2000}>
          <Typography variant="h5" textAlign="left" sx={{userSelect:'none'}}>
            App Tareas
          </Typography>
          </Grow>
          <Box textAlign="right">
            {!user ? (
              <>
                <Link to="/login">
                  <Button sx={{ mx: 2 }} variant="contained">
                    LOGIN
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outlined">Registrarse</Button>
                </Link>
              </>
            ) : (
              <Button onClick={handleLogout} sx={{ mx: 2 }} variant="outlined">
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{userSelect:'none'}}/>
      <Outlet />
      <Container className="App" >
        {user ? (
          <>
            <Tareas />
          </>
        ) : (
          <Box sx={{userSelect:'none'}}>
            <img alt="" src={homeImage} height={400} />
            <Typography variant="h4">¡Bienvenido! Ingresa para ver tus tareas</Typography>
          </Box>
        )}
      </Container>
    </>
  );
}
