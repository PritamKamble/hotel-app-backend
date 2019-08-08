const express = require("express");
const router = express.Router();
const HotelController = require('../controllers/hotel');
const multer=require('multer');

router.get("/:id", HotelController.getHotel); // get hotel by using users id

router.get("/", HotelController.getAllHotel); // get all hotels 

router.post("/:id", multer({}).single(), HotelController.saveHotel); // save hotel by using users id

router.delete("/:id", multer({}).single(), HotelController.removeHotel);// remove hotel by using users id

module.exports = router;