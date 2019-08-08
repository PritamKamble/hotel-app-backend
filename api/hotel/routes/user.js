const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user');
const multer=require('multer');


router.post("/login", multer({}).single(), UserController.getUser);

router.post("/register", multer({}).single(), UserController.saveUser);

router.delete("/:id", multer({}).single(), UserController.removeUser);

module.exports = router;