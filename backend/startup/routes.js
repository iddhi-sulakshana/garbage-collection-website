const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const users = require("../routes/users");
const auth = require("../routes/auth");
const articles = require("../routes/articles");
const collectings = require("../routes/collectings");
const incidents = require("../routes/incidents");

// middlewares
const error = require("../middlewares/error");
const fileUpload = require("express-fileupload");

// routes

module.exports = function (app) {
  // middlewares
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    fileUpload({
      limits: {
        fileSize: 10000000, // Around 10MB
      },
      abortOnLimit: true,
    })
  );
  if (process.env.NODE_ENV === "development") app.use(morgan("tiny"));
  // assign public folder
  app.use(express.static("public"));

  // assign route paths
  app.use("/users", users);
  app.use("/auth", auth);
  app.use("/articles", articles);
  app.use("/collectings", collectings);
  app.use("/incidents", incidents);

  app.use(error);
};
