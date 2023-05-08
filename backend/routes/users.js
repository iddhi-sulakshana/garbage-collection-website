const express = require("express");
const { User, validateUser } = require("../models/user");
const { encrypt } = require("../utils/hash");
const { auth } = require("../middlewares/auth");
const { isValidObjectId } = require("mongoose");
const router = express.Router();

// get user
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-__v -password");
  if (user) return res.send(user);

  res.status(404).send("User not found");
});

// create GC and CS members
router.post("/admin", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.send(403).send("Not allowed");

  const errorMsg = validateUser(req.body);
  if (errorMsg) return res.status(400).send(errorMsg);

  if (req.body.role === "gtf" || req.body.role === "admin")
    return res.status(403).send("Not allowed user roles");

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

// update users admin
router.put("/admin/:id", auth, async (req, res) => {
  if (isValidObjectId(req.params.id) === false)
    return res.status(400).send("Invalid id");
  if (req.user.role !== "admin") return res.send(403).send("Not allowed");

  const errorMsg = validateUser(req.body);
  if (errorMsg) return res.status(400).send(errorMsg);

  if (req.body.role === "gtf" || req.body.role === "admin")
    return res.status(403).send("Not allowed user roles");

  const exist = await User.findOne({ email: req.body.email });
  if (exist && exist._id != req.params.id)
    return res.status(400).send("User already registered with same email");

  const user = await User.findByIdAndUpdate(req.params.id, req.body);
  if (!user) return res.status(404).send("User not found");

  return res.send("Successfully updated user");
});

// change password patch
router.patch("/password", auth, async (req, res) => {
  if (!req.body.password) return res.status(400).send("Password is required");
  req.body.password = await encrypt(req.body.password);
  const user = await User.findByIdAndUpdate(
    req.user,
    {
      password: req.body.password,
    },
    { new: true }
  );
  if (!user) return res.status(404).send("User not found");

  return res.send("Successfully updated password");
});

module.exports = router;
