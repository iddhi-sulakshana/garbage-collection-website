const mongoose = require("mongoose");
const path = require("path").join(__dirname, "../.env");
require("dotenv").config({ path });
process.env.NODE_ENV = process.env.NODE_ENV
  ? process.env.NODE_ENV
  : "development";

process.env.JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
  ? process.env.JWT_PRIVATE_KEY
  : "ExampleKey";

process.env.DB = process.env.DB ? process.env.DB : "mongodb://127.0.0.1/CMC";

// connect to database
const databaseString = process.env.NODE_ENV
  ? `${process.env.DB}_${process.env.NODE_ENV}`
  : process.env.DB;
mongoose.connect(databaseString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const express = require("express");
const app = express();
require("../../startup/routes")(app);

module.exports = app;
