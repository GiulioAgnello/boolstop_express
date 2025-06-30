// import
const express = require("express");
const videogamesControllers = require("../controllers/videogamesControllers");

const router = express.Router();

// router
router.get(`/`, videogamesControllers.index);
router.get(`/:id`, videogamesControllers.show);

module.exports = router;
