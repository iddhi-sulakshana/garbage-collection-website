import { useEffect, useState } from "react";

export default function useFetchCollectings(refresh) {
  const [collectings, setCollectings] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollectings();
  }, [refresh]);

  async function fetchCollectings() {
    setLoading(true);
    try {
      setTimeout(() => {
        setCollectings([
          {
            id: "1",
            name: "Colombo City Centre",
            location: {
              lat: 6.927079,
              lng: 79.861244,
            },
            description:
              "Colombo City Centre is a location situated at lat: 6.927079, lng: 79.861244. It features a variety of images including a logo, a CMC logo, a location photo, and several other images. It also has a brief description of the location.",
            picture: "location.jpg",
            images: [
              "logo.png",
              "cmc-logo.png",
              "location.jpg",
              "notfound.jpg",
              "ondev.jpg",
            ],
          },
          {
            id: "2",
            name: "Colombo City Centre1",
            location: {
              lat: 6.927079,
              lng: 79.871244,
            },
            description:
              "Colombo City Centre is a location situated at lat: 6.927079, lng: 79.861244. It features a variety of images including a logo, a CMC logo, a location photo, and several other images. It also has a brief description of the location.",
            picture: "location.jpg",
            images: [
              "logo.png",
              "cmc-logo.png",
              "location.jpg",
              "notfound.jpg",
              "ondev.jpg",
            ],
          },
          {
            id: "3",
            name: "Colombo City Centre2",
            location: {
              lat: 6.957079,
              lng: 79.871244,
            },
            description:
              "Colombo City Centre is a location situated at lat: 6.927079, lng: 79.861244. It features a variety of images including a logo, a CMC logo, a location photo, and several other images. It also has a brief description of the location.",
            picture: "location.jpg",
            images: [
              "logo.png",
              "cmc-logo.png",
              "location.jpg",
              "notfound.jpg",
              "ondev.jpg",
            ],
          },
        ]);
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }
  return { collectings, error, loading };
}
