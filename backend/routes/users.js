const express = require("express");
const { User, validateUser } = require("../models/user");
const { encrypt } = require("../utils/hash");
const { auth } = require("../middlewares/auth");
const router = express.Router();

// get user
router.get("/me", async (req, res) => {
  const user = await User.findById(id).select("-__v -password");
  if (user) return res.send(user);

  res.status(404).send("User not found");
});

// create GC and CS members
router.post("/admin", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.send(403).send("Not allowed");

  if (!req.body.role) return res.status(400).send("Role is required");
  if (req.body.role === "gtf" || req.body.role === "admin")
    return res.status(403).send("Not allowed user roles");

  const errorMsg = validateUser(req.body);
  if (errorMsg) return res.status(400).send(errorMsg);

  const exist = await User.findOne({ email: req.body.email });
  if (exist)
    return res.status(400).send("User already registered with same email");

  try {
    req.body.password = await encrypt(req.body.password);
    const user = new User(req.body);
    await user.save();
    return res.send("Successfully Created user");
  } catch (ex) {
    return res.status(400).send(ex.message);
  }
});

// create gtf user
router.post("/", async (req, res) => {
  req.body.role = "gtf";

  const errorMsg = validateUser(req.body);
  if (errorMsg) return res.status(400).send(errorMsg);

  const exist = await User.findOne({ email: req.body.email });
  if (exist)
    return res.status(400).send("User already registered with same email");

  req.body.password = await encrypt(req.body.password);
  const user = new User(req.body);
  try {
    await user.save();
    return res.send("Successfully Signed up");
  } catch (ex) {
    return res.status(400).send(ex.message);
  }
});

module.exports = router;
