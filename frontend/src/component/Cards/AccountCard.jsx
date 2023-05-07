import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import getRole from "../../utils/getRole";

export default function AccountCard({ data }) {
  return (
    <Card sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            {data.name}
          </Typography>
          <Typography component="div" variant="subtitle2">
            {data.email}
          </Typography>
          <Typography
            component="div"
            variant="subtitle4"
            color="text.secondary"
          >
            {getRole(data.role)}
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
