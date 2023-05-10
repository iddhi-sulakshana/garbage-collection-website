const Joi = require("joi");
const { model } = require("mongoose");
const articleSchema = require("./schemas/article");

const Article = model("Article", articleSchema);

function validate(article) {
  const schema = new Joi.object({
    _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    title: Joi.string().min(5).max(20).required(),
    description: Joi.string().min(5).max(1024).required(),
    picture: Joi.string().min(5).max(1024),
  });
  const result = schema.validate(article);
  if (result.error) return result.error.details[0].message;
  return null;
}

module.exports.Article = Article;
module.exports.validateArticle = validate;
