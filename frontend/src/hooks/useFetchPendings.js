import axios from "axios";
import { useEffect, useState } from "react";
import getURL from "../utils/getURL";

export default function useFetchPendings(token, refresh) {
  const [pendings, setPendings] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (!token) {
      setPendings(null);
      setError("No token provided");
      setLoading(false);
      return;
    }
    fetchPendings();
    // eslint-disable-next-line
  }, [token, refresh]);

  async function fetchPendings() {
    axios
      .request({
        method: "GET",
        url: getURL("incidents/pending"),
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setPendings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }
  return { pendings, error, loading };
}
