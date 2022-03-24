/* eslint-disable camelcase */
require("dotenv").config();
const chalk = require("chalk");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const path = require("path");
const fs = require("fs");
const debug = require("debug")("Coinster:CoinControllers");
const Crypto = require("../../database/models/Crypto");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "coinster-e900b.firebaseapp.com",
  projectId: "coinster-e900b",
  storageBucket: "coinster-e900b.appspot.com",
  messagingSenderId: "83355654625",
  appId: "1:83355654625:web:fc2e056cecf2dd8c809aa0",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const getCryptos = async (req, res) => {
  const cryptoArray = await Crypto.find();
  res.status(200).json(cryptoArray);
  debug(chalk.bgYellow.black("Requested Crytos"));
};

const getSingleCrypto = async (req, res, next) => {
  const { id } = req.params;
  try {
    const crypto = await Crypto.findById(id);
    if (crypto) {
      res.status(200).json(crypto);
      debug(`Requested crypto: ${crypto}`);
    } else {
      const error = new Error("No se ha encontrado ninguna cryptomoneda");
      error.code = 404;
      next(error);
      debug(chalk.red(`Error: ${error.message}`));
    }
  } catch (error) {
    debug(chalk.red(`Error: ${error.message}`));
    next(error);
  }
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

const uploads = "uploads/";

const createCrypto = async (req, res, next) => {
  // eslint-disable-next-line no-new
  new Promise((resolve) => {
    try {
      const {
        name,
        symbol,
        slug,
        tags,
        max_supply,
        total_supply,
        platform,
        price,
        percent_change_1h,
        percent_change_24h,
        percent_change_7d,
        market_cap,
      } = req.body;
      const oldFileName = path.join(uploads, req.file.filename);
      const newFileName = path.join(
        uploads,
        `${Date.now()}_${req.file.originalname}`
      );
      fs.rename(oldFileName, newFileName, (error) => {
        if (error) {
          debug(chalk.red("Error renaming file"));
          next(error);
          resolve();
        } else {
          debug("Rename complete");
          fs.readFile(newFileName, async (errorFile, file) => {
            const storageRef = ref(storage, req.file.originalname);
            await uploadBytes(storageRef, file);
            const firebaseFileURL = await getDownloadURL(storageRef);
            const addNewCrypto = await Crypto.create({
              name,
              symbol,
              slug,
              tags,
              max_supply,
              total_supply,
              platform,
              price,
              percent_change_1h,
              percent_change_24h,
              percent_change_7d,
              market_cap,
              img: firebaseFileURL,
            });
            res.status(201).json(addNewCrypto);
            debug(chalk.green(`Created new request ${addNewCrypto}`));
            resolve();
            if (errorFile) {
              debug(chalk.red("Error reading file"));
              next(errorFile);
              resolve();
            }
          });
        }
      });
    } catch (error) {
      fs.unlink(path.join(uploads, req.file.filename), () => {
        debug(chalk.red(`Error: ${error.message}`));
        next(error);
        resolve();
      });
    }
  });
};

const updateCrypto = async (req, res, next) => {
  new Promise((resolve) => {
    const cryptoToUpdate = req.body;
    const { id } = req.params;
    try {
      if (req.file) {
        const oldFileName = path.join("uploads", req.file.filename);
        const newFileName = path.join("uploads", req.file.originalname);

        fs.rename(oldFileName, newFileName, () => {
          fs.readFile(newFileName, async (error, file) => {
            if (error) {
              next(error);
              debug(chalk.red("Error:", error.message));
              resolve();
            } else {
              const storageRef = ref(storage, req.file.originalname);
              await uploadBytes(storageRef, file);

              const newImage = await getDownloadURL(storageRef);
              cryptoToUpdate.img = newImage;
              const updatedCrypto = await Crypto.findByIdAndUpdate(
                id,
                cryptoToUpdate,
                { new: true }
              );
              res.status(200).json(updatedCrypto);
              debug(chalk.green("Updated crypto"));
              resolve();
            }
          });
        });
      } else {
        (async () => {
          const cryptoToBeUpdated = req.body;
          const editedCrypto = await Crypto.findByIdAndUpdate(
            id,
            cryptoToBeUpdated,
            { new: true }
          );
          res.status(200).json(editedCrypto);
          debug(chalk.green("Updated crypto"));
          resolve();
        })();
      }
    } catch (error) {
      fs.unlink(path.join("uploads", req.file.filename), () => {
        error.code = 400;
        next(error);
        debug(chalk.red(`Error: ${error.message}`));
        resolve();
      });
      error.message = "Error updating the crypto";
      error.code = 400;
      next(error);
      resolve();
    }
  });
};

module.exports = {
  getCryptos,
  deleteCrypto,
  createCrypto,
  getSingleCrypto,
  updateCrypto,
};
