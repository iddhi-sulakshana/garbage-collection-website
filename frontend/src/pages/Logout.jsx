import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetToken } from "../hooks/AppContext";

export default function Logout({ setLoggedIn }) {
  const setToken = useSetToken();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("x-token");
    setToken(null);
    navigate("/login");
  }, [setToken, navigate]);
  return <></>;
}
