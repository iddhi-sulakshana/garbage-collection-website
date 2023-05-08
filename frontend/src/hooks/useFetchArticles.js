import { useEffect, useState } from "react";

export default function useFetchArticles(refresh) {
  const [articles, setArticles] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchArticles();
  }, [refresh]);
  async function fetchArticles() {
    try {
      setTimeout(() => {
        setArticles([
          {
            id: 1,
            title: "First Article",
            description:
              "loremp ipsum dolor sit amet tempor lorem loremp ipsum dolor sit amet tempor lorem loremp ipsum dolor sit amet tempor lorem loremp ipsum dolor sit amet tempor lorem ",
            picture: "https://picsum.photos/500/200",
          },
          {
            id: 2,
            title: "Second Article",
            description:
              "loremp ipsum dolor sit amet tempor lorem loremp ipsum dolor sit amet tempor lorem loremp ipsum dolor sit amet tempor lorem loremp ipsum dolor sit amet tempor lorem ",
            picture: "https://picsum.photos/500/200",
          },
          {
            id: 3,
            title: "Third Article",
            description:
              "loremp ipsum dolor sit amet tempor lorem loremp ipsum dolor sit amet tempor lorem loremp ipsum dolor sit amet tempor lorem loremp ipsum dolor sit amet tempor lorem ",
            picture: "https://picsum.photos/500/200",
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
