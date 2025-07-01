const express = require("express");
const { IndexForPlatform } = require("../controllers/platformController");
const router = express.Router();

router.post("/platform", IndexForPlatform);

module.exports = router;
