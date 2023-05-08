const { Schema } = require("mongoose");

// for User model
module.exports = new Schema({
  name: {
    type: String,
    minlength: 5,
    maxlenth: 20,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    index: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    minlength: 10,
    maxlength: 15,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  picture: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
    default: "profile/default.png",
  },
  role: {
    type: String,
    enum: ["admin", "gtf", "gc", "cs"],
    required: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
});
