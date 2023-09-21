import { Routes, Route } from "react-router-dom";
import { Profile } from "./views/Profile";
import { About } from "./views/About";
import Login from "./views/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ThemeProvider } from "@emotion/react";
import { Suspense } from "react";
import { Skeleton } from "@mui/material";
import { Navigation } from "./components/Navigation";
import { Home } from "./views/Home";
import { Register } from "./views/Register";

export const App = () => {
  return (
    <main>
      <ThemeProvider theme={{}}>
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
    </main>
  );
};

export default App;
