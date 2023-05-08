const express = require("express");
const { Article, validateArticle } = require("../models/article");
const { auth } = require("../middlewares/auth");
const fs = require("fs");
const saveImage = require("../utils/saveImage");
const { isValidObjectId } = require("mongoose");
const router = express.Router();

// get article
router.get("/", async (req, res) => {
  const articles = await Article.find({}).select("-__v");
  res.send(articles);
});

// create article
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Access denied");

  const picture = req.files ? req.files.picture || undefined : undefined;
  if (!picture || !/image/.test(picture.mimetype))
    return res.status(400).send("Picture required or Invalid picture type");

  const error = validateArticle(req.body);
  if (error) return res.status(400).send(error);

  const article = new Article(req.body);
  article.picture = await saveImage(picture, `articles/${article._id}`);

  try {
    await article.save();
    return res.send(article);
  } catch (ex) {
    return res.status(400).send(ex.message);
  }
});

// update article
router.put("/:id", auth, async (req, res) => {
  if (isValidObjectId(req.params.id) === false)
    return res.status(400).send("Invalid id");
  if (req.user.role !== "admin") return res.status(403).send("Access denied");

  const picture = req.files ? req.files.picture || undefined : undefined;
  if (!picture || !/image/.test(picture.mimetype))
    return res.status(400).send("Picture required or Invalid picture type");

  const error = validateArticle(req.body);
  if (error) return res.status(400).send(error);

  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).send("Article not found");

  if (article.picture)
    fs.unlink(`./public/${article.picture}`, (err) => {
      if (err && err.code !== "ENOENT") return res.status(500).send(err);
    });

  article.set(req.body);
  article.picture = await saveImage(picture, `articles/${article._id}`);

  try {
    await article.save();
    return res.send(article);
  } catch (ex) {
    return res.status(400).send(ex.message);
  }
});

// delete article
router.delete("/:id", auth, async (req, res) => {
  if (isValidObjectId(req.params.id) === false)
    return res.status(400).send("Invalid id");
  if (req.user.role !== "admin") return res.status(403).send("Access denied");

  const article = await Article.findByIdAndDelete(req.params.id);
  if (!article) return res.status(404).send("Article not found");

  if (article.picture)
    fs.unlink(`./public/${article.picture}`, (err) => {
      if (err && err.code === "ENOENT")
        return res.status(404).send("Picture not found");
    });

  return res.send("Delete successfully");
});

module.exports = router;
