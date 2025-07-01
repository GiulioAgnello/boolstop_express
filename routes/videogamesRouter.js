// import
const express = require("express");
const videogamesControllers = require("../controllers/videogamesControllers");

const router = express.Router();

// router
router.get(`/`, videogamesControllers.index);
router.get(`/:id`, videogamesControllers.show);
router.get(`/platform/xbox`, videogamesControllers.indexBox);
// router.get(`/playstation`, platformController.IndexForPlatform);
// router.get(`/pc`, platformController.IndexForPlatform);
// router.get(`/nintendo`, platformController.IndexForPlatform);

module.exports = router;
