import { useEffect, useState } from "react";

export default function useFetchIncidents(refresh) {
  const [incidents, setIncidents] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncidents();
  }, [refresh]);

  async function fetchIncidents() {
    setLoading(true);
    try {
      setTimeout(() => {
        setIncidents([
          {
            id: "1",
            title: "Colombo City Centre",
            location: {
              lat: 6.927079,
              lng: 79.861244,
            },
            description:
              "Colombo City Centre is a location situated at lat: 6.927079, lng: 79.861244. It features a variety of images including a logo, a CMC logo, a location photo, and several other images. It also has a brief description of the location.",
            picture: "incident.jpg",
            status: "pending",
          },
          {
            id: "2",
            title: "Colombo City Centre1",
            location: {
              lat: 6.927079,
              lng: 79.871244,
            },
            description:
              "Colombo City Centre is a location situated at lat: 6.927079, lng: 79.861244. It features a variety of images including a logo, a CMC logo, a location photo, and several other images. It also has a brief description of the location.",
            picture: "incident.jpg",
            status: "accepted",
          },
          {
            id: "3",
            title: "Colombo City Centre2",
            location: {
              lat: 6.957079,
              lng: 79.871244,
            },
            description:
              "Colombo City Centre is a location situated at lat: 6.927079, lng: 79.861244. It features a variety of images including a logo, a CMC logo, a location photo, and several other images. It also has a brief description of the location.",
            picture: "incident.jpg",
            status: "rejected",
          },
          {
            id: "4",
            title: "Colombo City Centre3",
            location: {
              lat: 6.958009,
              lng: 79.871244,
            },
            description:
              "Colombo City Centre is a location situated at lat: 6.927079, lng: 79.861244. It features a variety of images including a logo, a CMC logo, a location photo, and several other images. It also has a brief description of the location.",
            picture: "incident.jpg",
            status: "completed",
          },
        ]);
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }
  return { incidents, error, loading };
}
