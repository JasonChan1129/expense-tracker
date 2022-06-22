const express = require("express");
const router = express.Router();

// routes
const home = require("./modules/home");

router.use("/", home);

module.exports = router;
