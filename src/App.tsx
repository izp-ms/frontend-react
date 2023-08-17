import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./views/Home";
import { About } from "./views/About";
import useToken from "./hooks/useToken";
import Login from "./views/Login";

function App() {
  const { token } = useToken();

  if (!token) {
    console.log(token);

    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
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
