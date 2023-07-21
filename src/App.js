import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import {
  AppBar,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import Tareas from "./components/Tareas";

function App() {
  const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        body {
          background-color: #0d2b45;
        }
        `,
      },
    },
    palette: {
      mode: "dark",
      primary: {
        light: "#ffd4a3",
        main: "#ffaa5e",
        dark: "#d08159",
      },
      secondary: {
        light: "#8d697a",
        main: "#544e68",
        dark: "#203c56",
      },
    },
    typography:{
      allVariants:{
        color: '#ffecd6'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Tareas/>
    </ThemeProvider>
  );
}

export default App;
