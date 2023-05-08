const express = require("express");
const { Collecting, validateCollecting } = require("../models/collecting");
const { auth } = require("../middlewares/auth");
const fs = require("fs");
const saveImage = require("../utils/saveImage");
const { isValidObjectId } = require("mongoose");
const router = express.Router();

// get collecting places
router.get("/", async (req, res) => {
  const collectings = await Collecting.find({}).select("-__v");
  res.send(collectings);
});

// create collecting place
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Access denied");

  req.body.location = {
    lat: req.body?.lat,
    lng: req.body?.lng,
  };
  delete req.body?.lat;
  delete req.body?.lng;

  const picture = req.files ? req.files.picture || undefined : undefined;
  if (!picture || !/image/.test(picture.mimetype))
    return res.status(400).send("Picture required or Invalid picture type");

  const images = req.files ? req.files.images || undefined : undefined;
  if (Array.isArray(images)) {
    for (let i = 0; i < images.length; i++) {
      if (!/image/.test(images[i].mimetype))
        return res.status(400).send("Invalid image type");
    }
  } else {
    if (!images || !/image/.test(images.mimetype))
      return res.status(400).send("Picture required or Invalid picture type");
  }
  const error = validateCollecting(req.body);
  if (error) return res.status(400).send(error);

  const collecting = new Collecting(req.body);
  collecting.picture = await saveImage(
    picture,
    `collectings/${collecting._id}`
  );

  // save images array
  collecting.images = [];
  if (Array.isArray(images)) {
    for (let i = 0; i < images.length; i++) {
      collecting.images.push(
        await saveImage(images[i], `collectings/${collecting._id}-${i}`)
      );
    }
  } else {
    collecting.images.push(
      await saveImage(images, `collectings/${collecting._id}-0`)
    );
  }

  try {
    await collecting.save();
    return res.send(collecting);
  } catch (ex) {
    return res.status(400).send(ex.message);
  }
});

// update article
router.put("/:id", auth, async (req, res) => {
  if (isValidObjectId(req.params.id) === false)
    return res.status(400).send("Invalid id");
  if (req.user.role !== "admin") return res.status(403).send("Access denied");

  req.body.location = {
    lat: req.body?.lat,
    lng: req.body?.lng,
  };
  delete req.body?.lat;
  delete req.body?.lng;

  const picture = req.files ? req.files.picture || undefined : undefined;
  if (!picture || !/image/.test(picture.mimetype))
    return res.status(400).send("Picture required or Invalid picture type");

  const images = req.files ? req.files.images || undefined : undefined;
  if (Array.isArray(images)) {
    for (let i = 0; i < images.length; i++) {
      if (!/image/.test(images[i].mimetype))
        return res.status(400).send("Invalid image type");
    }
  } else {
    if (!images || !/image/.test(images.mimetype))
      return res.status(400).send("Picture required or Invalid picture type");
  }

  const error = validateCollecting(req.body);
  if (error) return res.status(400).send(error);

  const collecting = await Collecting.findById(req.params.id);
  if (!collecting) return res.status(404).send("Collecting place not found");

  collecting.images.push(collecting.picture);

  if (collecting.images) {
    // loop through images array and delete each image
    for (let i = 0; i < collecting.images.length; i++) {
      fs.unlink(`./public/${collecting.images[i]}`, (err) => {
        if (err && err.code !== "ENOENT") return res.status(500).send(err);
      });
    }
  }

  collecting.set(req.body);
  collecting.picture = await saveImage(
    picture,
    `collectings/${collecting._id}`
  );
  collecting.images = [];
  if (Array.isArray(images)) {
    for (let i = 0; i < images.length; i++) {
      collecting.images.push(
        await saveImage(images[i], `collectings/${collecting._id}-${i}`)
      );
    }
  } else {
    collecting.images.push(
      await saveImage(images, `collectings/${collecting._id}-0`)
    );
  }

  try {
    await collecting.save();
    return res.send(collecting);
  } catch (ex) {
    return res.status(400).send(ex.message);
  }
});

// delete article
router.delete("/:id", auth, async (req, res) => {
  if (isValidObjectId(req.params.id) === false)
    return res.status(400).send("Invalid id");

  if (req.user.role !== "admin") return res.status(403).send("Access denied");

  const collecting = await Collecting.findByIdAndDelete(req.params.id);
  if (!collecting) return res.status(404).send("Collecting place not found");

  collecting.images.push(collecting.picture);

  if (collecting.images) {
    // loop through images array and delete each image
    for (let i = 0; i < collecting.images.length; i++) {
      fs.unlink(`./public/${collecting.images[i]}`, (err) => {
        if (err && err.code !== "ENOENT") return res.status(500).send(err);
      });
    }
  }

  return res.send("Delete successfully");
});

module.exports = router;
