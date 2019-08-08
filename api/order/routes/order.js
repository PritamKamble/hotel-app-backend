const express = require("express");
const router = express.Router();
const OrderController = require('../controllers/order');
const multer=require('multer');


router.get("/", multer({}).single(), OrderController.getOrders);

router.get("/:menuID", multer({}).single(), OrderController.getOrders);

router.post("/:menuID", multer({}).single(), OrderController.makeOrder);

module.exports = router;