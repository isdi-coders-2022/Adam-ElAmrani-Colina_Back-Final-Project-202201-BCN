require("dotenv").config();
const express = require("express");
const {
  getCryptos,
  deleteCrypto,
  createCrypto,
} = require("../controllers/coinControllers");

const router = express.Router();

router.get("/list", getCryptos);
router.delete("/crypto/:id", deleteCrypto);
router.post("/new-coin", createCrypto);

module.exports = router;
