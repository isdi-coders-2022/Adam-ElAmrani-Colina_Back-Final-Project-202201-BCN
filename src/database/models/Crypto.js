const { Schema, model } = require("mongoose");

const CryptoSchema = new Schema({
  name: {
    type: String,
  },
  symbol: {
    type: String,
  },
  slug: {
    type: String,
  },
  tags: {
    type: Array,
  },
  max_supply: {
    type: Number,
  },
  total_supply: {
    type: Number,
  },
  platform: {
    type: Array,
  },
  price: {
    type: Number,
  },
  percent_change_1h: {
    type: Number,
  },
  percent_change_24h: {
    type: Number,
  },
  percent_change_7d: {
    type: Number,
  },
  market_cap: {
    type: Number,
  },
  img: {
    type: String,
  },
});

const Crypto = model("Crypto", CryptoSchema, "cryptos");

module.exports = Crypto;
