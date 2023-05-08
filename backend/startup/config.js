const path = require("path").join(__dirname, "../.env");
require("dotenv").config({ path });

module.exports = function () {
  process.env.NODE_ENV = process.env.NODE_ENV
    ? process.env.NODE_ENV
    : "development";

  process.env.JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
    ? process.env.JWT_PRIVATE_KEY
    : "ExampleKey";

  process.env.DB = process.env.DB ? process.env.DB : "mongodb://127.0.0.1/CMC";

  if (process.env.NODE_ENV === "development") {
    console.log("\n🚧 Node running as Development Environment 🚧\n");
    console.log(`Enviroment Variables Loaded: ${path}`);
    console.log(`🔑 JWT_PRIVATE_KEY: ${process.env.JWT_PRIVATE_KEY}`);
    console.log(`🔑 DB: ${process.env.DB}`);
    console.log();
  }
};
