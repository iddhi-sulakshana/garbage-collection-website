import React, { useState } from "react";
import CustomMap from "../component/CustomMap";
import { useAppBarHei } from "../hooks/AppContext";
import { Box, Fab } from "@mui/material";
import GridList from "../component/GridList";
import useFetchLocations from "../hooks/useFetchLocations";
import Loader from "../component/Loader";
import { Refresh } from "@mui/icons-material";
import LocationDetails from "../component/LocationDetails";

export default function Home() {
  const { height } = useAppBarHei();
  const [refresh, setRefresh] = useState(0);
  const { locations, loading, error } = useFetchLocations(refresh);
  const [clicked, setClicked] = useState(null);
  return (
    <Box
      sx={{
        position: "relative",
        display: { xs: "block", md: "flex" },
        width: "100%",
        height: {
          xs: `calc(100vh - ${height}px)`,
          md: `calc(100vh - ${height}px)`,
        },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "30vW" },
          height: { xs: "50%", md: "100%" },
          overflowY: "scroll",
          p: 2,
        }}
      >
        {clicked ? (
          <LocationDetails
            location={locations[clicked - 1]}
            setClicked={setClicked}
          />
        ) : loading ? (
          <Loader />
        ) : error ? (
          "Error Retrieving Data"
        ) : (
          <GridList
            data={locations}
            clicked={clicked}
            setClicked={setClicked}
          />
        )}
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "70vW" },
          height: { xs: "50%", md: "100%" },
        }}
      >
        {loading ? (
          <Loader />
        ) : error ? (
          "Error Retrieving Data"
        ) : (
          <>
            <CustomMap
              locations={locations}
              setClicked={setClicked}
              clicked={clicked}
            />

            <Fab
              sx={{ position: "absolute", top: { xs: 350, md: 80 }, right: 10 }}
              color="primary"
              size="small"
              aria-label="refresh"
              onClick={() => {
                setClicked(null);
                setRefresh(refresh + 1);
              }}
            >
              <Refresh />
            </Fab>
          </>
        )}
      </Box>
    </Box>
  );
}
