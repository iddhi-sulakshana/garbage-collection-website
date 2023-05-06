import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OnDev from "./pages/OnDev";
import Navbar from "./pages/Navbar";
import Logout from "./pages/Logout";
import Notfound from "./pages/Notfound";
import { useSetToken } from "./hooks/AppContext";

export default function App() {
  const setToken = useSetToken();
  const token = localStorage.getItem("x-token");
  useEffect(() => {
    if (token) {
      setToken(token);
    }
  }, [token, setToken]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/ondev" element={<OnDev />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}
