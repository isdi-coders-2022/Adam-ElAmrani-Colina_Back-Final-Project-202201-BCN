const { Joi } = require("express-validation");

const cyrptoJoiSchema = {
  body: Joi.object({
    name: Joi.string(),
    symbol: Joi.string(),
    slug: Joi.string(),
    tags: Joi.string(),
    max_supply: Joi.string(),
    total_supply: Joi.string(),
    platform: Joi.string(),
    price: Joi.string(),
    percent_change_1h: Joi.string(),
    percent_change_24h: Joi.string(),
    percent_change_7d: Joi.string(),
    market_cap: Joi.string(),
    img: Joi.string(),
  }),
};

module.exports = cyrptoJoiSchema;
