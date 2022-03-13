const chalk = require("chalk");
const debug = require("debug")("Coinster:CoinControllers");
const Crypto = require("../../database/models/Crypto");

const getCryptos = async (req, res) => {
  const cryptoArray = await Crypto.find();
  res.json(cryptoArray);
  debug(chalk.bgYellow.black("Requested Crytos"));
};

const deleteCrypto = async (req, res, next) => {
  const { id } = req.params;
  try {
    const crypto = await Crypto.findByIdAndDelete(id);
    if (crypto) {
      res.json(`Crypto ${crypto.name} with id ${crypto.id} deleted.`);
      debug(chalk.green(`Crypto ${crypto.name} with id ${crypto.id} deleted.`));
    } else {
      const error = new Error("Crypto not found");
      debug(chalk.bgBlackBright.white(`Error: ${error.message}`));
      error.code = 404;
      next(error);
    }
  } catch (error) {
    debug(chalk.red(`Error: ${error.message}`));
    next(error);
  }
};
module.exports = { getCryptos, deleteCrypto };
