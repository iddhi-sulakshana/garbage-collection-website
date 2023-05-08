const { Schema } = require("mongoose");

// for Article model
module.exports = new Schema({
  title: {
    type: String,
    minlength: 5,
    maxlenth: 20,
    required: true,
  },
  description: {
    type: String,
    minlength: 5,
    maxlenth: 1024,
    required: true,
  },
  picture: {
    type: String,
    minlength: 5,
    maxlenth: 1024,
    required: true,
  },
});
