import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import getRole from "../utils/getRole";

export default function Logo({ mobile, role }) {
  const title = "CMC";
  const dRole = getRole(role);
  if (mobile) {
    return (
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          sx={{ display: { xs: "flex", md: "none" }, mr: 1, height: 30 }}
          alt="logo"
          src="/logo.png"
        />
        <Typography
          variant="h5"
          noWrap
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          {title}
          <Typography variant="caption">{dRole}</Typography>
        </Typography>
      </Link>
    );
  }
  return (
    <Link
      to="/"
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        sx={{ display: { xs: "none", md: "flex" }, mr: 1, height: 30 }}
        alt="logo"
        src="/logo.png"
      />
      <Typography
        variant="h6"
        noWrap
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {title}
        <Typography variant="caption">{dRole}</Typography>
      </Typography>
    </Link>
  );
}
