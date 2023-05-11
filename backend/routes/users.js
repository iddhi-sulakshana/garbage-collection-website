const express = require("express");
const { User, validateUser } = require("../models/user");
const { encrypt } = require("../utils/hash");
const { auth } = require("../middlewares/auth");
const { isValidObjectId } = require("mongoose");
const fs = require("fs");
const saveImage = require("../utils/saveImage");
const router = express.Router();

// get all the gc and cs users not equal to gtf or admin
router.get("/admin", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Not allowed");

  const users = await User.find({
    role: { $nin: ["gtf", "admin"] },
  }).select("-__v -password");

  return res.send(users);
});

// get user
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-__v -password");
  if (user) return res.send(user);

  res.status(404).send("User not found");
});

// create GC and CS members
router.post("/admin", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Not allowed");

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
router.post("/signup", async (req, res) => {
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

// update user
router.put("/", auth, async (req, res) => {
  req.body.role = req.user.role;
  req.body.password = "11111";
  const errorMsg = validateUser(req.body);
  if (errorMsg) return res.status(400).send(errorMsg);
  delete req.body.password;
  const picture = req.files?.picture;
  if (picture && !/image/.test(picture.mimetype))
    return res.status(400).send("Invalid image file");

  const exist = await User.findOne({ email: req.body.email });
  if (exist && exist._id != req.user._id)
    return res.status(400).send("User already registered with same email");

  if (req.body.password) delete req.body.password;
  const user = await User.findByIdAndUpdate(req.user._id, req.body);
  if (!user) return res.status(404).send("User not found");

  if (picture) {
    if (user.picture !== "profile/default.png")
      fs.unlink(user.picture, (err) => {
        if (err && err.code !== "ENOENT") return res.status(500).send(err);
      });
    user.picture = await saveImage(picture, `profile/${user._id}`);
    try {
      await user.save();
    } catch (ex) {
      return res.status(400).send(ex.message);
    }
  }

  return res.send("Successfully updated user");
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
  req.body.password = await encrypt(req.body.password);

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
