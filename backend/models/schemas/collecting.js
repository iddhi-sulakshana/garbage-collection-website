const { Schema } = require("mongoose");

// for Collecting model
module.exports = new Schema({
  name: {
    type: String,
    minlength: 5,
    maxlenth: 20,
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
    lng: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
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
  images: {
    type: [String],
    minlength: 1,
    maxlength: 5,
    required: true,
  },
});
