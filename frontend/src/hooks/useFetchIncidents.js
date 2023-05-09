import axios from "axios";
import { useEffect, useState } from "react";
import getURL from "../utils/getURL";

export default function useFetchIncidents(token, refresh) {
  const [incidents, setIncidents] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (!token) {
      setIncidents(null);
      setError("No token provided");
      setLoading(false);
      return;
    }
    fetchIncidents();
    // eslint-disable-next-line
  }, [token, refresh]);

  function fetchIncidents() {
    axios
      .request({
        method: "GET",
        url: getURL("incidents/me"),
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setIncidents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }
  return { incidents, error, loading };
}
