require("dotenv").config();
const express = require("express");
const { getCryptos, deleteCrypto } = require("../controllers/coinControllers");

const router = express.Router();

router.get("/list", getCryptos);
router.delete("/crypto/:id", deleteCrypto);

module.exports = router;
