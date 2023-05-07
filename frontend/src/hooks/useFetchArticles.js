import { useEffect, useState } from "react";

export default function useFetchArticles(token, refresh) {
  const [articles, setArticles] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (!token) {
      setArticles(null);
      setError("No token provided");
      setLoading(false);
      return;
    }
    fetchArticles();
  }, [token, refresh]);
  async function fetchArticles() {
    try {
      setTimeout(() => {
        setArticles([
          {
            id: 1,
            title: "First Article",
            description: "First Article Description",
            picture: "https://picsum.photos/500/200",
            pictures: [
              "https://picsum.photos/500/200",
              "https://picsum.photos/500/200",
              "https://picsum.photos/500/200",
            ],
          },
          {
            id: 2,
            title: "Second Article",
            description: "Second Article Description",
            picture: "https://picsum.photos/500/200",
            pictures: [
              "https://picsum.photos/500/200",
              "https://picsum.photos/500/200",
              "https://picsum.photos/500/200",
            ],
          },
          {
            id: 3,
            title: "Third Article",
            description: "Third Article Description",
            picture: "https://picsum.photos/500/200",
            pictures: [
              "https://picsum.photos/500/200",
              "https://picsum.photos/500/200",
              "https://picsum.photos/500/200",
            ],
          },
        ]);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }
  return { articles, error, loading };
}
