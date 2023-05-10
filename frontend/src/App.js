import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OnDev from "./pages/OnDev";
import Navbar from "./pages/Navbar";
import Logout from "./pages/Logout";
import Notfound from "./pages/Notfound";
import { useSetToken, useUser } from "./hooks/AppContext";
import Profile from "./pages/Profile";
import Accounts from "./pages/Accounts";
import CreateArticles from "./pages/CreateArticles";
import Collecting from "./pages/Collecting";
import Articles from "./pages/Articles";
import ReportIncidents from "./pages/ReportIncidents";
import Reports from "./pages/Reports";
import HandleReports from "./pages/HandleReports";

export default function App() {
  const setToken = useSetToken();
  const { user } = useUser();
  useEffect(() => {
    setToken(localStorage.getItem("x-token"));
  }, [setToken]);
  useEffect(() => {}, [user]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/ondev" element={<OnDev />} />
        <Route path="/articles" element={<Articles />} />
        {user && <Route path="/profile" element={<Profile />} />}
        {user?.role === "admin" && (
          <>
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/create-articles" element={<CreateArticles />} />
            <Route path="/create-collecting" element={<Collecting />} />
          </>
        )}
        {user?.role === "gc" && (
          <Route path="/handle-reports" element={<HandleReports />} />
        )}
        {user?.role === "gtf" && (
          <Route path="/report-incidents" element={<ReportIncidents />} />
        )}
        {user?.role === "cs" && <Route path="/reports" element={<Reports />} />}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}
