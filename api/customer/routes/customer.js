const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customer');
const multer = require('multer');

router.post('/register', multer().single(), CustomerController.saveCustomer);

router.post('/login', multer().single(), CustomerController.getCustomer);

module.exports = router;