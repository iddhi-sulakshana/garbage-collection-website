import {
  Grid,
  Paper,
  ThemeProvider,
  createTheme,
  styled,
  Box,
  CardActionArea,
  Typography,
} from "@mui/material";
import React from "react";
import LocationCard from "./Cards/LocationCard";
import AccountCard from "./Cards/AccountCard";
import ArticleCard from "./Cards/ArticleCard";
import IncidentCard from "./Cards/IncidentCard";

const theme = new createTheme();
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "left",
  color: theme.palette.text.secondary,
  height: "auto",
}));
export default function GridList({ data, setClicked, title, type }) {
  return (
    <>
      <Typography
        component="div"
        variant="h5"
        textAlign="center"
        sx={{ pb: 2 }}
      >
        {title}
      </Typography>
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
                <CardActionArea
                  onClick={() => {
                    if (type === "location" || type === "incidents") {
                      setTimeout(() => {
                        setClicked(index + 1);
                      });
                      return;
                    }
                    setTimeout(() => {
                      setClicked(item);
                    }, 300);
                  }}
                >
                  {type === "location" || type === "collectings" ? (
                    <LocationCard data={item} />
                  ) : type === "accounts" ? (
                    <AccountCard data={item} />
                  ) : type === "articles" ? (
                    <ArticleCard data={item} />
                  ) : type === "incidents" ? (
                    <IncidentCard data={item} />
                  ) : null}
                </CardActionArea>
              </Item>
            ))}
          </Box>
        </ThemeProvider>
      </Grid>
    </>
  );
}
