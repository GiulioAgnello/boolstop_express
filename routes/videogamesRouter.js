// import
const express = require("express");
const videogamesControllers = require("../controllers/videogamesControllers");

const router = express.Router();

// router
router.get(`/`, videogamesControllers.index);
router.get(`/platform/:platform`, videogamesControllers.indexPlatform);
router.get(`/genres/:genres`, videogamesControllers.indexRelated);
router.get(`/platform/:platform/:id`, videogamesControllers.showPlatform);
router.get(`/:id`, videogamesControllers.show);
router.get('/slug/:slug', videogamesControllers.showBySlug);

module.exports = router;
