require("dotenv").config();
const debug = require("debug")("Coinster:UserControllers:");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const User = require("../../database/models/User");

const register = async (req, res, next) => {
  const { username, password, name } = req.body;
  const existingUser = await User.findOne({ username });
  const existingEmail = await User.findOne({ email });

  if (!username || !password || !name) {
    debug(chalk.red("Missing one or more register requirements"));
    const error = new Error("One or more requirements are missing");
    res.json({ error: error.message });
    next(error);
  } else if (existingUser || existingEmail) {
    const error = new Error("User or e-mail already exists");
    res.status(400).json({ error: error.message });
    debug(chalk.red(`Tried to create an already existing user`));
    next(error);
  } else {
    try {
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const data = {
        username,
        password: hashPassword,
        name,
      };
      User.create(data);
      debug(chalk.greenBright(`Created user: ${data.username}`));
      res.status(201).json("Register successfull");
    } catch (error) {
      debug(chalk.red("Something went wrong with register process"));
      next(error);
    }
  }
};

module.exports = register;
