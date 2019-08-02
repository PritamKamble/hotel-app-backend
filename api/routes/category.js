const express = require("express");
const router = express.Router();
const CategoryController = require('../controllers/category');
const multer=require('multer');


router.get("/:id", CategoryController.getCategory);

router.post("/:id", multer({}).single(), CategoryController.saveCategory);

router.delete("/:id", multer({}).single(), CategoryController.removeCategory);

router.patch("/:id", multer().single(), CategoryController.updateCategory);

module.exports = router;