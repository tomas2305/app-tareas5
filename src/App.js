import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import Home from "./components/Home";
import { AuthProvider } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";

function App() {
  const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        body {
          background-color: #0d2b45;
        }
        
        /* Handle */
        ::-webkit-scrollbar {
          background: #ffaa5e;
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
    typography: {
      allVariants: {
        color: "#ffecd6",
      },
    },
  });

  return (
    <AuthProvider>
      <AlertProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Home />
        </ThemeProvider>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;
