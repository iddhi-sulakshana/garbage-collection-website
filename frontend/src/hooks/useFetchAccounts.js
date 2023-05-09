import axios from "axios";
import { useEffect, useState } from "react";
import getURL from "../utils/getURL";
export default function useFetchAccounts(token, refresh) {
  const [accounts, setAccounts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setError(null);
    if (!token) {
      setAccounts(null);
      setError("No token provided");
      setLoading(false);
      return;
    }
    fetchAccounts();
    // eslint-disable-next-line
  }, [token, refresh]);

  function fetchAccounts() {
    axios
      .request({
        method: "GET",
        url: getURL("users/admin"),
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setAccounts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }
  return { accounts, error, loading };
}
