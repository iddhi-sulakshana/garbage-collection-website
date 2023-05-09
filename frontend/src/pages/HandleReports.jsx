import React, { useState } from "react";
import LocationsMap from "../component/LocationsMap";
import { useAppBarHei, useToken } from "../hooks/AppContext";
import { Box, Fab } from "@mui/material";
import GridList from "../component/GridList";
import Loader, { LoaderError } from "../component/Loader";
import { Refresh } from "@mui/icons-material";
import useFetchPendings from "../hooks/useFetchPendings";
import ReportDetails from "../component/ReportDetails";

export default function HandleReports() {
  const token = useToken();
  const { height } = useAppBarHei();
  const [refresh, setRefresh] = useState(0);
  const { pendings, error, loading } = useFetchPendings(token, refresh);
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
          <ReportDetails
            location={pendings[clicked - 1]}
            setClicked={setClicked}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        ) : loading ? (
          <Loader />
        ) : error ? (
          <LoaderError error={error} />
        ) : (
          <GridList
            title="Reports"
            data={pendings}
            setClicked={setClicked}
            type={"reports"}
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
              locations={pendings}
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
