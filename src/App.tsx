import { Routes, Route } from "react-router-dom";
import { Profile } from "./views/Profile";
import { About } from "./views/About";
import Login from "./views/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ThemeProvider } from "@emotion/react";
import { Suspense, createContext, useEffect, useMemo } from "react";
import { CssBaseline, Skeleton, createTheme } from "@mui/material";
import { Navigation } from "./components/Navigation";
import { Home } from "./views/Home";
import { Register } from "./views/Register";
import { useTypedDispatch, useTypedSelector } from "./store";
import { getCurrentUser } from "./services/auth.service";
import { setUser } from "./store/auth.slice";
import { PostcardsPage } from "./views/Postcard";
import { useSettingsContext } from "./context/settings-context";
import { FriendsPage } from "./views/Friends";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const App = () => {
  const user = useTypedSelector((state) => state.auth.user);
  const dispatch = useTypedDispatch();

  const { colorMode, handleSetColorMode } = useSettingsContext();
  const colorModeMemo = useMemo(
    () => ({
      toggleColorMode: () => {
        handleSetColorMode(colorMode === "LIGHT" ? "DARK" : "LIGHT");
      },
    }),
    [colorMode, handleSetColorMode]
  );

  useEffect(() => {
    if (!user) {
      dispatch(setUser(getCurrentUser()));
    }
  }, [dispatch, user]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: colorMode === "LIGHT" ? "#8DCFDE" : "#8DCFDE",
          },
          secondary: {
            main: colorMode === "LIGHT" ? "#E3E6E7" : "#2F2F2F",
          },
          background: {
            paper: colorMode === "LIGHT" ? "#E3E6E7" : "#2F2F2F",
          },
          text: {
            primary: colorMode === "LIGHT" ? "#282828" : "#F1F0F6",
            secondary: colorMode === "LIGHT" ? "#8DCFDE" : "#8DCFDE",
          },
          error: {
            main: colorMode === "LIGHT" ? "#FF0000" : "#FF0000",
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: colorMode === "LIGHT" ? "#C4CDCD" : "#2F2F2F",
                color: colorMode === "LIGHT" ? "#282828" : "#282828",
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                background: colorMode === "LIGHT" ? "#FFFFFF" : "#1C1C1C",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },
                "& fieldset": {
                  borderColor: colorMode === "LIGHT" ? "#FFFFFF" : "#2F2F2F",
                  borderRadius: 20,
                  color: colorMode === "LIGHT" ? "#282828" : "#ff00ff",
                },
                "& svg": {
                  color: colorMode === "LIGHT" ? "#30535B" : "#8DCFDE",
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
    [colorMode]
  );

  return (
    <main>
      <ColorModeContext.Provider value={colorModeMemo}>
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
                  path="/postcards"
                  element={
                    <ProtectedRoute>
                      <PostcardsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/friends"
                  element={
                    <ProtectedRoute>
                      <FriendsPage />
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
