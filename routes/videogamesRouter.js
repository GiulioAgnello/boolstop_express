// import
const express = require("express");
const videogamesControllers = require("../controllers/videogamesControllers");

const router = express.Router();

// router
router.get(`/`, videogamesControllers.index);
router.get(`/:id`, videogamesControllers.show);
router.get(`/platform/pc`, videogamesControllers.indexPc);
router.get(`/platform/pc/:id`, videogamesControllers.showPc);
router.get(`/platform/xbox`, videogamesControllers.indexBox);
router.get(`/platform/xbox/:id`, videogamesControllers.showXbox);
router.get(`/platform/playstation`, videogamesControllers.indexPs);
router.get(`/platform/playstation/:id`, videogamesControllers.showPs);
router.get(`/platform/nintendo`, videogamesControllers.indexNintendo);
router.get(`/platform/nintendo/:id`, videogamesControllers.showNintendo);

module.exports = router;
