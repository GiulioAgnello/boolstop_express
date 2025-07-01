const express = require("express");
const { IndexForPlatform } = require("../controllers/platformController");
const router = express.Router();

router.post("/videogames/:platform", IndexForPlatform);

module.exports = router;
