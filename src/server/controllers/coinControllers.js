const chalk = require("chalk");
const debug = require("debug")("Coinster:CoinControllers");
const Crypto = require("../../database/models/Crypto");

const getCryptos = async (req, res) => {
  const cryptoArray = await Crypto.find();
  res.status(200).json(cryptoArray);
  debug(chalk.bgYellow.black("Requested Crytos"));
};

const deleteCrypto = async (req, res, next) => {
  const { id } = req.params;
  try {
    const crypto = await Crypto.findByIdAndDelete(id);
    if (!crypto) {
      const error = new Error("Crypto not found");
      debug(chalk.bgBlackBright.white(`Error: ${error.message}`));
      next(error);
    } else {
      res
        .status(200)
        .json(`Crypto ${crypto.name} with id ${crypto.id} deleted.`);
      debug(chalk.green(`Crypto ${crypto.name} with id ${crypto.id} deleted.`));
    }
  } catch (error) {
    debug(chalk.red(`Error: ${error.message}`));
    next(error);
  }
};

const createCrypto = async (req, res, next) => {
  const newCrypto = req.body;
  try {
    const addNewCrypto = await Crypto.create(newCrypto);
    res.status(201);
    res.json(addNewCrypto);
    debug(chalk.green(`Created new request ${addNewCrypto}`));
  } catch (error) {
    debug(chalk.red(`Error: ${error.message}`));
    next(error);
  }
};

module.exports = { getCryptos, deleteCrypto, createCrypto };
