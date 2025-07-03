const express = require("express");
const ordersController = require("../controllers/ordersController");
const router = express.Router();

router.post("/:orderId/videogames", ordersController.addVideogameToOrder);
router.post("/addOrder", ordersController.addOrder);

module.exports = router;
