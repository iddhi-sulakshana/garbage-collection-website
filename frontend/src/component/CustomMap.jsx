import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Loader from "./Loader";

const containerStyle = {
  width: "100%",
  height: "100%",
};

// coordinates for colombo
const center = {
  lat: 6.9271,
  lng: 79.8612,
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAmL07kRQ1S3u2ldQ5rm9L6UzSQFpDkxPI",
  });
  // eslint-disable-next-line
  const [map, setMap] = React.useState(null);

  const onLoadMap = React.useCallback(function callback(map) {
    const marker = new window.google.maps.Marker({
      position: center,
      map,
    });

    // // Add click listener to marker
    marker.addListener("click", function () {
      // Do something when marker is clicked
      console.log("Marker clicked!");
    });
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoadMap}
      onUnmount={onUnmount}
    ></GoogleMap>
  ) : (
    <Loader />
  );
}

export default React.memo(MyComponent);
