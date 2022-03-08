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
  date_added: {
    type: Date,
  },
  max_supply: {
    type: Number,
  },
  circulating_supple: {
    type: Number,
  },
  total_supply: {
    type: Number,
  },
  last_updated: {
    type: Date,
  },
  USD: {
    price: {
      type: Number,
    },
    volume_24h: {
      type: Number,
    },
    volume_change_24h: {
      type: Number,
    },
    percent_change_7d: {
      type: Number,
    },
    market_cap: {
      type: Number,
    },
  },
});

const Crypto = model("Crypto", CryptoSchema, "cryptos");

module.exports = Crypto;
