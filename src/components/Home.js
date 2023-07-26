import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import Tareas from "./Tareas";

const Home = () => {
  const theme = useTheme();
  const secondary = theme.palette.secondary.dark;

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: secondary }}>
        <Toolbar sx={{justifyContent:'space-between'}} >
          <Typography variant="h5" textAlign="left">
            App Tareas
          </Typography>
          <Box textAlign='right'>
            <Button sx={{mx:2}} variant="contained">LOGIN</Button>
            <Button variant='outlined'>Registrarse</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Tareas />
    </>
  );
};
export default Home;
