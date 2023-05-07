import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Loader from "./Loader";

// coordinates for colombo
const center = {
  lat: 6.9271,
  lng: 79.8612,
};

function LocationsMap({ locations, setClicked, clicked }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAmL07kRQ1S3u2ldQ5rm9L6UzSQFpDkxPI",
  });
  // eslint-disable-next-line
  const [map, setMap] = useState(null);
  let markers = useMemo(() => [], []);

  const clickedIcon = useMemo(() => {
    return {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
      size: {
        height: 32,
        width: 32,
      },
      g: undefined,
      h: undefined,
    };
  }, []);
  const defaultIcon = useMemo(() => {
    return {
      url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      size: {
        height: 32,
        width: 32,
      },
      g: undefined,
      h: undefined,
    };
  }, []);
  const markerClick = useCallback(
    function callback(marker, index, click) {
      markers.forEach((item) => {
        item.setIcon(defaultIcon);
      });
      if (click === index + 1) {
        marker.setIcon(defaultIcon);
        setClicked(null);
      } else {
        marker.setIcon(clickedIcon);
        setClicked(index + 1);
      }
    },
    [clickedIcon, defaultIcon, markers, setClicked]
  );

  useEffect(() => {
    if (map) {
      const newMarkers = [];
      locations.forEach((location, index) => {
        const marker = new window.google.maps.Marker({
          position: location.location,
          map,
          title: location.name,
        });
        marker.setIcon(defaultIcon);
        marker.addListener("click", () => markerClick(marker, index, clicked));
        newMarkers.push(marker);
      });
      // eslint-disable-next-line
      markers = [...newMarkers];
    }
    if (clicked) {
      markers.forEach((item, index) => {
        if (clicked - 1 === index) item.setIcon(clickedIcon);
      });
    }
  }, [map, locations, markerClick, markers, defaultIcon, clickedIcon, clicked]);

  const onLoadMap = useCallback(
    function callback(map) {
      setMap(map);
    },
    [setMap]
  );

  const onUnmount = useCallback(
    function callback(map) {
      setMap(null);
    },
    [setMap]
  );

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "100%",
      }}
      center={center}
      zoom={12}
      onLoad={onLoadMap}
      onUnmount={onUnmount}
    ></GoogleMap>
  ) : (
    <Loader />
  );
}

export default memo(LocationsMap);
