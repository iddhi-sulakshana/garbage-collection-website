import axios from "axios";
import { useEffect, useState } from "react";
import getURL from "../utils/getURL";

export default function useFetchUser(token) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setError(null);
    setLoading(true);
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    fetchUser();
    // eslint-disable-next-line
  }, [token]);

  function fetchUser() {
    axios
      .request({
        method: "GET",
        url: getURL("users/me"),
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data || err.message);
        setLoading(false);
      });
  }

  return { user, error, loading };
}
