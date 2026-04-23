import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Signup from "./components/signup";
import Navbar from "./components/Navbar";
import Login from "./components/login";
import Dashboard from "./components/Dashboard";
import History from "./components/History";
import Home from "./pages/Home";

function App() {
  const storedToken = localStorage.getItem("token");

  const [token, setToken] = useState(
    storedToken && storedToken !== "undefined" ? storedToken : null,
  );
  if (token === "undefined") {
    localStorage.removeItem("token");
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 to-blue-300">
      <BrowserRouter>
        <Navbar token={token} setToken={setToken} />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/predict"
            element={
              token ? <Dashboard token={token} /> : <Navigate to={"/login"} />
            }
          />

          <Route
            path="/history"
            element={
              token ? <History token={token} /> : <Navigate to={"/login"} />
            }
          />

          <Route
            path="/login"
            element={
              !token ? (
                <Login setToken={setToken} />
              ) : (
                <Navigate to={"/predict"} />
              )
            }
          />

          <Route
            path="/signup"
            element={!token ? <Signup /> : <Navigate to={"/predict"} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
