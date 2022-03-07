require("dotenv").config();
const debug = require("debug")("Coinster:Index:");
const chalk = require("chalk");

const serverStart = require("./server/serverStart");
const app = require("./server/index");
const dataBaseStart = require("./database");

const port = process.env.PORT || 4000;
const dbConnection = process.env.MONGODB_STRING;

(async () => {
  try {
    await dataBaseStart(dbConnection);
    await serverStart(port, app);
  } catch (error) {
    debug(chalk.redBright(error.message));
  }
})();
