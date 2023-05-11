const app = require("express")();
require("../../startup/routes")(app);

module.exports = app;
