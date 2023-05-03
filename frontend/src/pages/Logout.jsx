import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ setLoggedIn }) {
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedIn(false);
    navigate("/login");
  }, [setLoggedIn, navigate]);
  return <></>;
}
