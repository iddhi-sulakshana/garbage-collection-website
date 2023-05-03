import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OnDev from "./pages/OnDev";
import Navbar from "./pages/Navbar";
import { useState } from "react";
import Logout from "./pages/Logout";
import Notfound from "./pages/Notfound";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} />} />
        <Route path="/ondev" element={<OnDev />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}
