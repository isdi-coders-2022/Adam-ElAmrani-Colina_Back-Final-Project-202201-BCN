require("dotenv").config();
const express = require("express");
const getCryptos = require("../controllers/coinControllers");

const router = express.Router();

router.get("/list", getCryptos);

module.exports = router;
