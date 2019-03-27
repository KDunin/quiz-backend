const express = require("express");
const router = express.Router();
const { signup, signin } = require("../handlers/auth");
const { google } = require("../handlers/google");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);

module.exports = router;
