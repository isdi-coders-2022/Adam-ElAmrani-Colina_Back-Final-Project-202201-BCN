require("dotenv").config();
const debug = require("debug")("Coinster:UserControllers:");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/User");

const register = async (req, res, next) => {
  const { username, password, name } = req.body;
  const existingUser = await User.findOne({ username });

  if (!username || !password || !name) {
    debug(chalk.red("Missing one or more register requirements"));
    const error = new Error("One or more requirements are missing");
    res.json({ error: error.message });
    next(error);
  } else if (existingUser) {
    const error = new Error("User already exists");
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

const login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    const error = new Error("Something went wrong");
    debug(chalk.red(`Username not found: ${error}`));
    res.status(404).json({ error: error.message });
    next(error);
  } else {
    const passwordComparison = await bcrypt.compare(password, user.password);
    if (!passwordComparison) {
      const error = new Error("Something went wrong");
      res.status(404).json({ error: error.message });
      next(error);
    } else {
      const data = { username };
      const token = jwt.sign(data, process.env.SECRET_KEY);
      res.json({ token: { token, username } });
    }
  }
};

const getUser = async (req, res, next) => {
  const headerAuth = req.header("Authorization");
  const token = headerAuth.replace("Bearer ", "");
  const username = jwt.verify(token, process.env.SECRET_KEY);
  const user = await User.findOne(username);

  if (user) {
    res.status(200).json({ user });
    debug(chalk.green(`Requested user ${user.username}`));
  } else {
    const error = new Error("Couldn't find the requested user");
    debug(chalk.red(`Error: ${error}`));
    res.status(404).json(error);
    next(error);
  }
};

module.exports = { register, login, getUser };
