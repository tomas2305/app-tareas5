import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import Tareas from "./Tareas";
import { Link, Outlet } from "react-router-dom";

export default function Home() {
  const theme = useTheme();
  const secondary = theme.palette.secondary.dark;

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: secondary }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h5" textAlign="left">
            App Tareas
          </Typography>
          <Box textAlign="right">
            <Link to="/login">
              <Button sx={{ mx: 2 }} variant="contained">
                LOGIN
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outlined">Registrarse</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Outlet/>
      <Tareas />
    </>
  );
};
