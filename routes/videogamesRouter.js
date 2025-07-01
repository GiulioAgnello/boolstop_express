// import
const express = require("express");
const videogamesControllers = require("../controllers/videogamesControllers");
// const platformController = require("../controllers/platformController");
const router = express.Router();

// router
router.get(`/`, videogamesControllers.index);
router.get(`/:id`, videogamesControllers.show);
// router.get(`/platform/:platform`, platformController.IndexForPlatform);

module.exports = router;
