const express = require("express");
const { Incident, validateIncident } = require("../models/incident");
const { auth } = require("../middlewares/auth");
const fs = require("fs");
const saveImage = require("../utils/saveImage");
const { isValidObjectId } = require("mongoose");
const router = express.Router();

// get user posted incidents
router.get("/me", auth, async (req, res) => {
  if (req.user.role !== "gtf") return res.status(403).send("Access denied");
  const incidents = await Incident.find({ user: req.user._id }).select(
    "-__v -user"
  );
  return res.send(incidents);
});

// get pending incidents
router.get("/pending", auth, async (req, res) => {
  if (req.user.role !== "gc") return res.status(403).send("Access denied");
  const incidents = await Incident.find({ status: "pending" }).select(
    "-__v -user"
  );
  return res.send(incidents);
});

// get accepted incidents
router.get("/accepted", auth, async (req, res) => {
  if (req.user.role !== "cs") return res.status(403).send("Access denied");
  const incidents = await Incident.find({ status: "accepted" }).select(
    "-__v -user"
  );
  return res.send(incidents);
});

// patch incident accept
router.patch("/accept/:id", auth, async (req, res) => {
  if (req.user.role !== "gc") return res.status(403).send("Access denied");
  if (isValidObjectId(req.params.id) === false)
    return res.status(400).send("Invalid id");

  const incident = await Incident.findOneAndUpdate(
    { _id: req.params.id, status: "pending" },
    { status: "accepted", flag: req.body.flag || false },
    { new: true }
  );
  if (!incident) return res.status(404).send("Incident not found");

  return res.send(incident);
});

// patch incident reject
router.patch("/reject/:id", auth, async (req, res) => {
  if (req.user.role !== "gc") return res.status(403).send("Access denied");
  if (isValidObjectId(req.params.id) === false)
    return res.status(400).send("Invalid id");

  const incident = await Incident.findOneAndUpdate(
    { _id: req.params.id, status: "pending" },
    { status: "rejected", flag: false },
    { new: true }
  );
  if (!incident) return res.status(404).send("Incident not found");

  return res.send(incident);
});

// patch incident complete
router.patch("/complete/:id", auth, async (req, res) => {
  if (req.user.role !== "cs") return res.status(403).send("Access denied");
  if (isValidObjectId(req.params.id) === false)
    return res.status(400).send("Invalid id");

  const incident = await Incident.findOneAndUpdate(
    { _id: req.params.id, status: "accepted" },
    { status: "completed", flag: false },
    { new: true }
  );
  if (!incident) return res.status(404).send("Incident not found");

  return res.send(incident);
});

// create incident
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "gtf") return res.status(403).send("Access denied");

  req.body.location = {
    lat: req.body?.lat,
    lng: req.body?.lng,
  };
  delete req.body?.lat;
  delete req.body?.lng;
  req.body.user = req.user._id;

  const picture = req.files ? req.files.picture || undefined : undefined;
  if (!picture || !/image/.test(picture.mimetype))
    return res.status(400).send("Picture required or Invalid picture type");

  const error = validateIncident(req.body);
  if (error) return res.status(400).send(error);

  const incident = new Incident(req.body);
  incident.picture = await saveImage(picture, `incidents/${incident._id}`);

  try {
    await incident.save();
    return res.send(incident);
  } catch (ex) {
    return res.status(400).send(ex.message);
  }
});

// update incident
router.put("/:id", auth, async (req, res) => {
  if (isValidObjectId(req.params.id) === false)
    return res.status(400).send("Invalid id");
  if (req.user.role !== "gtf") return res.status(403).send("Access denied");

  req.body.location = {
    lat: req.body?.lat,
    lng: req.body?.lng,
  };
  delete req.body?.lat;
  delete req.body?.lng;
  req.body.user = req.user._id;
  req.body.status = "pending";
  req.body.flag = false;

  const picture = req.files ? req.files.picture || undefined : undefined;
  if (!picture || !/image/.test(picture.mimetype))
    return res.status(400).send("Picture required or Invalid picture type");

  const error = validateIncident(req.body);
  if (error) return res.status(400).send(error);

  const incident = await Incident.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!incident) return res.status(404).send("Incident not found");

  fs.unlink(`./public/${incident.picture}`, (err) => {
    if (err && err.code !== "ENOENT") return res.status(500).send(err);
  });

  incident.set(req.body);
  incident.picture = await saveImage(picture, `incidents/${incident._id}`);

  try {
    await incident.save();
    return res.send(incident);
  } catch (ex) {
    return res.status(400).send(ex.message);
  }
});

// delete article
router.delete("/:id", auth, async (req, res) => {
  if (isValidObjectId(req.params.id) === false)
    return res.status(400).send("Invalid id");

  if (req.user.role !== "gtf") return res.status(403).send("Access denied");

  const incident = await Incident.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!incident) return res.status(404).send("Incident place not found");

  if (incident.picture) {
    fs.unlink(`./public/${incident.picture}`, (err) => {
      if (err && err.code !== "ENOENT") return res.status(500).send(err);
    });
  }

  return res.send("Delete successfully");
});

module.exports = router;
