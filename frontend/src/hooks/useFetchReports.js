import axios from "axios";
import { useEffect, useState } from "react";
import getURL from "../utils/getURL";

export default function useFetchReports(token, refresh) {
  const [reports, setReports] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (!token) {
      setReports(null);
      setError("No token provided");
      setLoading(false);
      return;
    }
    fetchReports();
    // eslint-disable-next-line
  }, [token, refresh]);

  async function fetchReports() {
    axios
      .request({
        method: "GET",
        url: getURL("incidents/accepted"),
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setReports(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }
  return { reports, error, loading };
}
