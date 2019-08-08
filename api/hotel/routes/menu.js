const express = require("express");
const router = express.Router();
const MenuController = require('../controllers/menu');
const multer=require('multer');


router.get("/:id", MenuController.getMenu); // get all menu from perticular category

router.post("/:id", multer({}).single(), MenuController.saveMenu); // save menu in collection and in perticular category.menuName <= id

router.patch("/:id", multer().single(), MenuController.updateMenu); // update menu from menuCollection

router.delete("/:id", multer({}).single(), MenuController.removeMenu); // remove menu from collection and menuName array

module.exports = router;