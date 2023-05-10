const Joi = require("joi");
const { model } = require("mongoose");
const collectingSchema = require("./schemas/collecting");

const Collecting = model("Collecting", collectingSchema);

function validate(collecting) {
  const schema = new Joi.object({
    _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    name: Joi.string().min(5).max(20).required(),
    location: Joi.object({
      lat: Joi.number().min(-90).max(90).required(),
      lng: Joi.number().min(-180).max(180).required(),
    }).required(),
    description: Joi.string().min(5).max(1024).required(),
    picture: Joi.string().min(5).max(1024),
    images: Joi.array().items(Joi.string().min(5).max(1024)).min(1).max(5),
  });
  const result = schema.validate(collecting);
  if (result.error) return result.error.details[0].message;
  return null;
}

module.exports.Collecting = Collecting;
module.exports.validateCollecting = validate;
