const Joi = require("joi");

const joiValidate = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().max(256).required(),
    description: Joi.string().max(500),
    comments: Joi.string().max(1000),
    rating: Joi.number().min(1).max(5).required(),
    visitDate: Joi.date(),
    image: Joi.string().max(500),
    longitude: Joi.number().required(),
    latitude: Joi.number().required(),
  });

  const { error, value } = schema.validate(req.body);

  next(error);
};

module.exports = joiValidate;
