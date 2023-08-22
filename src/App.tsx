import { Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { About } from "./views/About";
import Login from "./views/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
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
  );
}

export default App;
