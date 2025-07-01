const express = require('express');
const { addVideogameToOrder } = require('../controllers/ordersController');
const router = express.Router();

router.post('/:orderId/videogames', addVideogameToOrder);

module.exports = router;