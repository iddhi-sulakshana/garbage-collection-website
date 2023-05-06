import React from "react";
import { HashLoader } from "react-spinners";
import { useAppBarHei } from "../hooks/AppContext";
import { Box } from "@mui/material";
export default function Loader() {
  const { height } = useAppBarHei();
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      style={{ width: "100%", height: `calc(100vh - ${height}px)` }}
    >
      <HashLoader />
    </Box>
  );
}
