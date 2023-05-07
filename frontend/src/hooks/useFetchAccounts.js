import { useEffect, useState } from "react";

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
  }, [token, refresh]);

  async function fetchAccounts() {
    try {
      setTimeout(() => {
        setAccounts([
          {
            id: "1",
            name: "John Doe",
            email: "John.Doe@gmail.com",
            age: 25,
            address: "1234 Main St",
            role: "admin",
            picture:
              "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
          },
          {
            id: "2",
            name: "John Doe",
            email: "John.Doe@gmail.com",
            age: 25,
            address: "1234 Main St",
            role: "cs",
            picture:
              "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
          },
          {
            id: "3",
            name: "John Doe",
            email: "John.Doe@gmail.com",
            age: 25,
            address: "1234 Main St",
            role: "gc",
            picture:
              "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
          },
          {
            id: "4",
            name: "John Doe",
            email: "John.Doe@gmail.com",
            age: 25,
            address: "1234 Main St",
            role: "gtf",
            picture:
              "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
          },
        ]);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }
  return { accounts, error, loading };
}
