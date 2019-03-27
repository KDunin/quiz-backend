const express = require("express");
const router = express.Router();
const { signup, signin } = require("../handlers/auth");
const { google } = require("../handlers/google");
const { facebook } = require("../handlers/facebook");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.post("/facebook", facebook);

module.exports = router;
