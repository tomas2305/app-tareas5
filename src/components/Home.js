import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import Tareas from "./Tareas";
import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Loading from "./Loading";
import homeImage from "../assets/home.png";

export default function Home() {
  const theme = useTheme();
  const secondary = theme.palette.secondary.dark;
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
      console.log("logout correctamente");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: secondary }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h5" textAlign="left">
            App Tareas
          </Typography>
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
      <Toolbar />
      <Outlet />
      <Container className="App">
        {user ? (
          <>
            <Tareas />
          </>
        ) : (
          <>
            <img alt="" src={homeImage} height={400} />
            <Typography variant="h4">¡Bienvenido! Ingresa para ver tus tareas</Typography>
          </>
        )}
      </Container>
    </>
  );
}
