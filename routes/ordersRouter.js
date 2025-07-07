const express = require("express");
const ordersController = require("../controllers/ordersController");
const router = express.Router();
const { sendOrderConfirmationEmail } = require("../utils/mailer");

router.post("/:orderId/videogames", ordersController.addVideogameToOrder);
router.post("/addOrder", ordersController.addOrder);
router.post("/validate-discount", ordersController.validateDscCode);

module.exports = router;
