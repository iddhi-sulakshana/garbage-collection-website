import axios from "axios";
import { useEffect, useState } from "react";
import getURL from "../utils/getURL";

export default function useFetchCollectings(refresh) {
  const [collectings, setCollectings] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchCollectings();
  }, [refresh]);

  function fetchCollectings() {
    axios
      .request({
        method: "GET",
        url: getURL("collectings"),
      })
      .then((res) => {
        setCollectings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }
  return { collectings, error, loading };
}
