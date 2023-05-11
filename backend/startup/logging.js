const winston = require("winston");
require("express-async-errors");

module.exports = function () {
  if (process.env.NODE_ENV === "development") {
    winston.add(
      new winston.transports.Console({
        format: winston.format.printf((log) => log.message),
      })
    );
  }

  // exception logging for file
  if (process.env.NODE_ENV !== "development") {
    winston.exceptions.handle(
      new winston.transports.File({ filename: "./logs/exceptions.log" })
    );

    winston.add(
      new winston.transports.File({ filename: "./logs/logfile.log" })
    );
  }
  return winston;
};
