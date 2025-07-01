const express = require("express");
const platfontroller = require("../controllers/platformController");

const router = express.Router();

router.get("/", platfontroller.IndexForPlatform);

module.exports = router;
