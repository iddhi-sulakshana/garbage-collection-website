const { Schema } = require("mongoose");

// for Incident model
module.exports = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
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
  status: {
    type: String,
    index: true,
    enum: ["pending", "accepted", "rejected", "completed"],
    default: "pending",
  },
  flag: {
    type: Boolean,
    default: false,
  },
  comment: {
    type: String,
    minlength: 5,
    maxlenth: 20,
  },
});
