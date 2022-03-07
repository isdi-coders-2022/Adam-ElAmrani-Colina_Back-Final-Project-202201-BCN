require("dotenv").config();
const debug = require("debug")("Coinster:Index:");
const chalk = require("chalk");

const serverStart = require("./server/serverStart");
const app = require("./server/index");

const port = process.env.PORT || 4000;

(async () => {
  try {
    await serverStart(port, app);
  } catch (error) {
    debug(chalk.redBright(error.message));
  }
})();
