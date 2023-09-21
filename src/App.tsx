import { Routes, Route } from "react-router-dom";
import { Profile } from "./views/Profile";
import { About } from "./views/About";
import Login from "./views/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ThemeProvider } from "@emotion/react";
import { Suspense, createContext, useMemo, useState } from "react";
import { CssBaseline, Skeleton, createTheme } from "@mui/material";
import { Navigation } from "./components/Navigation";
import { Home } from "./views/Home";
import { Register } from "./views/Register";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const App = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#8DCFDE" : "#8DCFDE",
          },
          secondary: {
            main: mode === "light" ? "#E3E6E7" : "#2F2F2F",
          },
          background: {
            paper: mode === "light" ? "#E3E6E7" : "#2F2F2F",
          },
          text: {
            primary: mode === "light" ? "#282828" : "#F1F0F6",
            secondary: mode === "light" ? "#8DCFDE" : "#8DCFDE",
          },
          error: {
            main: mode === "light" ? "#FF0000" : "#FF0000",
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: mode === "light" ? "#C4CDCD" : "#2F2F2F",
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                background: mode === "light" ? "#FFFFFF" : "#1C1C1C",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },
                "& fieldset": {
                  borderColor: mode === "light" ? "#FFFFFF" : "#2F2F2F",
                  borderRadius: 20,
                  color: mode === "light" ? "#282828" : "#ff00ff",
                },
                "& svg": {
                  color: mode === "light" ? "#30535B" : "#8DCFDE",
                },
                "&.Mui-disabled": {
                  fieldset: {
                    color: "#fff",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ffffff1b",
                  },
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <main>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense
            fallback={
              <Navigation>
                <Skeleton />
              </Navigation>
            }
          >
            <Navigation>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <ProtectedRoute>
                      <About />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="*"
                  element={
                    <div>
                      <h2>404 Page not found</h2>
                    </div>
                  }
                />
              </Routes>
            </Navigation>
          </Suspense>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </main>
  );
};

export default App;
