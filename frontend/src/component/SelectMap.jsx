import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Loader from "./Loader";
import { IconButton } from "@mui/material";
import { MyLocation } from "@mui/icons-material";

// coordinates for colombo
const center = {
  lat: 6.9271,
  lng: 79.8612,
};
function SelectMap({ setLat, setLng, lat, lng }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAmL07kRQ1S3u2ldQ5rm9L6UzSQFpDkxPI",
  });
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const CurrentLoc = useRef();
  useEffect(() => {
    if (map) {
      if (marker) marker.setMap(null);
      const newMarker = new window.google.maps.Marker({
        position: lat && lng ? { lat: lat, lng: lng } : center,
        map: map,
        title: "Hello World!",
        draggable: true,
      });
      newMarker.addListener("dragend", function (event) {
        setLat(event.latLng.lat());
        setLng(event.latLng.lng());
      });
      setMarker(newMarker);
    }
    // eslint-disable-next-line
  }, [map, lat, lng]);

  const handleSetCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLat = position.coords.latitude;
          const currentLng = position.coords.longitude;
          setLat(currentLat);
          setLng(currentLng);
          if (map) {
            if (marker) marker.setMap(null);
            const newMarker = new window.google.maps.Marker({
              position: { lat: currentLat, lng: currentLng },
              map: map,
              title: "Hello World!",
              draggable: true,
            });
            newMarker.addListener("drag", function (event) {
              setLat(event.latLng.lat());
              setLng(event.latLng.lng());
            });
            setMarker(newMarker);
          }
        },
        (error) => {
          alert(error.message);
          console.error(error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, [map, marker, setLat, setLng]);

  const onLoadMap = useCallback(
    function callback(maps) {
      const button = document.createElement("button");
      button.innerHTML = "Click me!";
      maps.controls[window.google.maps.ControlPosition.RIGHT_CENTER].push(
        CurrentLoc.current
      );
      setMap(maps);
    },
    [setMap]
  );
  const onUnmount = useCallback(
    function callback(maps) {
      setMap(null);
    },
    [setMap]
  );

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "90%",
      }}
      center={center}
      zoom={12}
      onLoad={onLoadMap}
      onUnmount={onUnmount}
    >
      <IconButton
        variant="contained"
        size="large"
        ref={CurrentLoc}
        onClick={handleSetCurrentLocation}
        color="primary"
      >
        <MyLocation />
      </IconButton>
    </GoogleMap>
  ) : (
    <Loader />
  );
}
export default memo(SelectMap);
