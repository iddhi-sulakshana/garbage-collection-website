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
import Profile from "./pages/Profile";
import Accounts from "./pages/Accounts";
import CreateArticles from "./pages/CreateArticles";
import Collecting from "./pages/Collecting";
import Articles from "./pages/Articles";
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/create-articles" element={<CreateArticles />} />
        <Route path="/create-collecting" element={<Collecting />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}
