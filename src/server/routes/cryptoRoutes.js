require("dotenv").config();
const multer = require("multer");
const express = require("express");
const { validate } = require("express-validation");
const {
  getCryptos,
  deleteCrypto,
  createCrypto,
} = require("../controllers/coinControllers");

const upload = multer({ dest: "uploads/" });
const cyrptoJoiSchema = require("../schemas/cryptoJoiSchema");

const router = express.Router();

router.get("/list", getCryptos);
router.delete("/crypto/:id", deleteCrypto);
router.post(
  "/new-crypto",
  upload.single("img"),
  validate(cyrptoJoiSchema),
  createCrypto
);

module.exports = router;
