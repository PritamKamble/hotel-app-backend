const mongoose = require("mongoose");
const Customer = require('../models/customer');

exports.saveCustomer = (req, res, next) => {
    const customer = new Customer({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        pass: req.body.pass
    });

    customer.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({
                msg: "Error while Saving user details",
                err: err
            });
        });
};

exports.getCustomer = (req, res, next) => {
    Customer.find({
        email: req.body.email,
        pass: req.body.pass
    }).populate("orders")
        .then(

            result => {
                if (result.length < 1) {
                    res.status(500).json({
                        msg: "Authentication Error",
                    });
                } else {
                    res.status(201).json(result);
                }
            });
};