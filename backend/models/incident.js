const Joi = require("joi");
const { model } = require("mongoose");
const incidentSchema = require("./schemas/incident");

const Incident = model("Incident", incidentSchema);

function validate(incident) {
  const schema = new Joi.object({
    _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    user: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    title: Joi.string().min(5).max(20).required(),
    location: Joi.object({
      lat: Joi.number().min(-90).max(90).required(),
      lng: Joi.number().min(-180).max(180).required(),
    }).required(),
    description: Joi.string().min(5).max(1024).required(),
    picture: Joi.string().min(5).max(1024),
    status: Joi.string().valid("pending", "accepted", "rejected", "completed"),
    flag: Joi.boolean(),
    comment: Joi.string().min(5).max(20),
  });
  const result = schema.validate(incident);
  if (result.error) return result.error.details[0].message;
  return null;
}

module.exports.Incident = Incident;
module.exports.validateIncident = validate;
