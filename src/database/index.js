require("dotenv").config();
const debug = require("debug")("Coinster:Database");
const chalk = require("chalk");
const mongoose = require("mongoose");

const dataBaseStart = (accesDatabase) =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-param-reassign, no-underscore-dangle
        delete ret._id;
        // eslint-disable-next-line no-param-reassign, no-underscore-dangle
        delete ret.__v;
      },
    });
    mongoose.set("returnOriginal");
    mongoose.connect(accesDatabase, (error) => {
      if (error) {
        debug(chalk.red(`An error ocurred: ${error.message}`));
        reject(new Error(`An error ocurred: ${error.message}`));
      }
      debug(chalk.blueBright("Connection to Database succesfull"));
      resolve();
    });
  });

module.exports = dataBaseStart;
