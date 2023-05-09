import axios from "axios";
import { useEffect, useState } from "react";
import getURL from "../utils/getURL";

export default function useFetchArticles(refresh) {
  const [articles, setArticles] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchArticles();
  }, [refresh]);
  function fetchArticles() {
    axios
      .request({
        method: "GET",
        url: getURL("articles"),
      })
      .then((res) => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }
  return { articles, error, loading };
}
