const { Schema, model } = require("mongoose");

const CryptoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
  },
  max_supply: {
    type: String,
    required: true,
  },
  total_supply: {
    type: String,
    required: true,
  },
  platform: {
    type: Array,
  },
  price: {
    type: String,
    required: true,
  },
  percent_change_1h: {
    type: String,
  },
  percent_change_24h: {
    type: String,
  },
  percent_change_7d: {
    type: String,
  },
  market_cap: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

const Crypto = model("Crypto", CryptoSchema, "cryptos");

module.exports = Crypto;
