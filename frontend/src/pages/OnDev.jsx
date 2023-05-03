import React from "react";
import CustomThemeProvider from "../component/CustomThemeProvider";
import { Link } from "react-router-dom";

export default function OnDev() {
  return (
    <CustomThemeProvider>
      <img src="/ondev.jpg" alt="Underconstruction" />
      <Link to="/">Back to Home</Link>
    </CustomThemeProvider>
  );
}
