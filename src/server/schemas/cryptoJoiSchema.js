const { Joi } = require("express-validation");

const cyrptoJoiSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    symbol: Joi.string().required(),
    slug: Joi.string().required(),
    tags: Joi.array(),
    max_supply: Joi.string().required(),
    total_supply: Joi.string().required(),
    platform: Joi.array(),
    price: Joi.string().required(),
    percent_change_1h: Joi.string(),
    percent_change_24h: Joi.string(),
    percent_change_7d: Joi.string(),
    market_cap: Joi.string().required(),
    img: Joi.string(),
  }),
};

module.exports = cyrptoJoiSchema;
