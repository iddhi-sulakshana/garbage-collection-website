import React from "react";
import CustomThemeProvider from "../component/CustomThemeProvider";
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <CustomThemeProvider>
      <img src="/notfound.jpg" alt="Not Found" />
      <Link to="/ ">Go to Home</Link>
    </CustomThemeProvider>
  );
}
