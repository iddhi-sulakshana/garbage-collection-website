import React, { useState } from "react";
import { useAppBarHei } from "../hooks/AppContext";
import { Box, Fab } from "@mui/material";
import Loader, { LoaderError } from "../component/Loader";
import { Add, Refresh } from "@mui/icons-material";
import GridList from "../component/GridList";
import useFetchIncidents from "../hooks/useFetchIncidents";
import IncidentForm from "../component/Forms/Incident";

export default function ReportIncidents() {
  const { height } = useAppBarHei();
  const [clicked, setClicked] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const { incidents, error, loading } = useFetchIncidents(refresh);
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
          position: "relative",
          p: 2,
        }}
      >
        {loading ? (
          <Loader />
        ) : error ? (
          <LoaderError error={error} />
        ) : (
          <>
            <Fab
              sx={{ position: "absolute", top: { xs: 10, md: 10 }, right: 15 }}
              color="primary"
              size="small"
              aria-label="add"
              onClick={() => setClicked(null)}
            >
              <Add />
            </Fab>
            <GridList
              title="Reported Incidents"
              type="incidents"
              data={incidents}
              setClicked={setClicked}
            />
          </>
        )}
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "70vW" },
          height: { xs: "50%", md: "100%" },
          overflowY: "scroll",
        }}
      >
        <IncidentForm clicked={clicked} />
      </Box>
      <Fab
        sx={{ position: "absolute", top: { xs: 350, md: 15 }, right: 10 }}
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
    </Box>
  );
}
