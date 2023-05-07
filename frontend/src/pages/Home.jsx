import React, { useState } from "react";
import LocationsMap from "../component/LocationsMap";
import { useAppBarHei } from "../hooks/AppContext";
import { Box, Fab } from "@mui/material";
import GridList from "../component/GridList";
import Loader, { LoaderError } from "../component/Loader";
import { Refresh } from "@mui/icons-material";
import LocationDetails from "../component/LocationDetails";
import useFetchCollectings from "../hooks/useFetchCollectings";

export default function Home() {
  const { height } = useAppBarHei();
  const [refresh, setRefresh] = useState(0);
  const {
    collectings: locations,
    loading,
    error,
  } = useFetchCollectings(refresh);
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
          <LoaderError error={error} />
        ) : (
          <GridList
            title="Collecting Places"
            data={locations}
            setClicked={setClicked}
            type={"location"}
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
          <LoaderError error={error} />
        ) : (
          <>
            <LocationsMap
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
