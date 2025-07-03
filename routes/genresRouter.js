const express = require("express");
const router = express.Router();
const { getAllGenres } = require("../controllers/genresController");

router.get("/genres", getAllGenres);

module.exports = router;
