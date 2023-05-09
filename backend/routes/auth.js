const express = require("express");
const { User } = require("../models/user");
const { validPassword } = require("../utils/hash");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("-__v");
  if (!user) return res.status(400).send("Invalid email address");

  const isValidPassword = await validPassword(password, user.password);
  if (!isValidPassword) return res.status(400).send("Invalid password");

  user.password = undefined;

  const token = user.generateAuthToken();

  res.set("Access-Control-Expose-Headers", "x-auth-token");
  res.header("x-auth-token", token).send("Successfully logged in");
});

module.exports = router;
