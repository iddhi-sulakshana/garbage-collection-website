import { ThemeProvider } from "@emotion/react";
import { Box, Container, CssBaseline, createTheme } from "@mui/material";
import React from "react";

const theme = createTheme();

export default function CustomThemeProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            position: "relative",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
