import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function ArticleCard({ data }) {
  return (
    <Card sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            {data.title}
          </Typography>
          <Typography component="div" variant="subtitle2">
            {data.description.split(" ").slice(0, 15).join(" ") + "..."}
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
