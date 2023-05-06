import React from "react";
import CustomMap from "../component/CustomMap";
import { useAppBarHei } from "../hooks/AppContext";

export default function Home() {
  const { height } = useAppBarHei();
  const containerStyle = {
    width: "100%",
    height: `calc(100vh - ${height}px)`,
  };
  return (
    <div style={containerStyle}>
      <CustomMap />
    </div>
  );
}
