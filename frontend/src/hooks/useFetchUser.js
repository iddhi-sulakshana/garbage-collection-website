import { useEffect, useState } from "react";

export default function useFetchUser(token) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setError(null);
    if (!token) {
      setUser(null);
      setError("No token provided");
      setLoading(false);
      return;
    }
    fetchUser();
  }, [token]);

  async function fetchUser() {
    try {
      setTimeout(() => {
        setUser({
          id: "1",
          name: "John Doe",
          email: "John.Doe@gmail.com",
          age: 25,
          address: "1234 Main St",
          role: "cs",
          picture:
            "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
        });
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return { user, error, loading };
}
