const chalk = require("chalk");
const debug = require("debug")("Coinster:CoinControllers");
const Crypto = require("../../database/models/Crypto");

const getCryptos = async (req, res) => {
  const cryptoArray = await Crypto.find();
  res.json(cryptoArray);
  debug(chalk.bgYellow.black("Requested Crytos"));
};

module.exports = getCryptos;
