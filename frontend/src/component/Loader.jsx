import React from "react";
import { HashLoader, ClipLoader } from "react-spinners";
import { useAppBarHei } from "../hooks/AppContext";
import { Box, Typography } from "@mui/material";
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
export function LoaderError({ error }) {
  const { height } = useAppBarHei();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
      style={{ width: "100%", height: `calc(100vh - ${height}px)` }}
    >
      <Box component="img" src="/error.gif" alt="error" sx={{ width: "50%" }} />
      <Typography variant="h6" sx={{ color: "red" }}>
        Error
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "red" }}>
        {error}
      </Typography>
    </Box>
  );
}
export function Loader1() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ClipLoader />
    </Box>
  );
}
