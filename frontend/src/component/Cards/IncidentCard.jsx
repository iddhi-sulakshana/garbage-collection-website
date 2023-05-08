import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { LocationOn } from "@mui/icons-material";
import { Chip } from "@mui/material";

export default function IncidentCard({ data }) {
  return (
    <Card sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            {data.title}
          </Typography>
          <Typography
            variant="subtitle4"
            color="text.secondary"
            component="div"
          >
            {data.description.split(" ").slice(0, 15).join(" ") + "..."}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
            display="flex"
            alignItems="center"
            mt={1}
            justifyContent="space-between"
          >
            <LocationOn />
            {data.location.lat + " " + data.location.lng}{" "}
            <Chip
              label={data.flag ? "Immediate" : data.status}
              color={
                data.flag
                  ? "error"
                  : data.status === "completed"
                  ? "success"
                  : data.status === "accepted"
                  ? "warning"
                  : data.status === "rejected"
                  ? "error"
                  : "default"
              }
            />
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 100, height: "auto", minHeight: 100 }}
        image={data.picture}
        alt="Live from space album cover"
      />
    </Card>
  );
}
