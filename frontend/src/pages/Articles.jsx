import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAppBarHei } from "../hooks/AppContext";
import useFetchArticles from "../hooks/useFetchArticles";
import Loader, { LoaderError } from "../component/Loader";
import ArticleDialog from "../component/ArticleDialog";
export default function Articles() {
  const { height } = useAppBarHei();
  const { articles, loading, error } = useFetchArticles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setData(null);
  };
  return (
    <Box
      sx={{
        width: "100%",
        pt: 1,
        height: {
          xs: `calc(100vh - ${height}px)`,
          md: `calc(100vh - ${height}px)`,
        },
      }}
    >
      <Typography textAlign="center" variant="h4" sx={{ mb: 2 }}>
        Articles
      </Typography>
      {loading ? (
        <Loader />
      ) : error ? (
        <LoaderError error={error} />
      ) : (
        <Grid container spacing={4} p={5} pt={3}>
          {articles.map((article, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                elevation={5}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height={250}
                  image={article.picture}
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {article.title}
                  </Typography>
                  <Typography>
                    {article.description.split(" ").slice(0, 15).join(" ") +
                      "..."}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      setData(article);
                      setOpen(true);
                    }}
                  >
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <ArticleDialog open={open} data={data} handleClose={handleClose} />
    </Box>
  );
}
