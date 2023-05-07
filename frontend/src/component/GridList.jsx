import {
  Grid,
  Paper,
  ThemeProvider,
  createTheme,
  styled,
  Box,
  CardActionArea,
} from "@mui/material";
import React from "react";
import DataCard from "./DataCard";

const theme = new createTheme();
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "left",
  color: theme.palette.text.secondary,
  height: "auto",
}));
export default function GridList({ data, clicked, setClicked }) {
  return (
    <Grid item xs={6}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { md: "1fr" },
            gap: 2,
          }}
        >
          {data.map((item, index) => (
            <Item elevation={3} key={index}>
              {clicked - 1 === index ? (
                <DataCard data={item} />
              ) : (
                <CardActionArea
                  onClick={() => {
                    setTimeout(() => {
                      setClicked(index + 1);
                    }, 300);
                  }}
                >
                  <DataCard data={item} />
                </CardActionArea>
              )}
            </Item>
          ))}
        </Box>
      </ThemeProvider>
    </Grid>
  );
}
