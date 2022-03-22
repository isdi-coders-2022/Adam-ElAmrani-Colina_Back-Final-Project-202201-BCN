require("dotenv").config();
const express = require("express");
const { register, login, getUser } = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", getUser);

module.exports = router;
