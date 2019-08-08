const mongoose = require("mongoose");
const Order = require("../models/order");
const User = require("../../hotel/models/user");
const Hotel = require("../../hotel/models/hotel");
const Category = require("../../hotel/models/category");
const Menu = require("../../hotel/models/menu");
const Customer = require("../../customer/models/customer");

exports.makeOrder = (req, res, next) => {

    User.find({ orders: { "$in": [req.params.menuID] } }).exec().then(result => {
        console.log(result);
        if (result.length >= 1) {
            Order.findByIdAndUpdate(req.params.menuID, {
                $inc: { count: 1 }
            }).exec()
                .then(result => {
                    console.log(result);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            Category.findOne({
                menuName: { "$in": [req.params.menuID] }
            }).exec().then(category => {
                Hotel.findOne({
                    categoryName: { "$in": [category._id] }
                }).exec().then(hotel => {
                    User.findOne({
                        hotelName: { "$in": [hotel._id] }
                    }).exec().then(user => {

                        const order = new Order({
                            _id: new mongoose.Types.ObjectId(),
                            customer: req.body.customer,
                            hotel: hotel._id
                        });
                        order.save()
                            .then(result => {
                                user.update({ $push: { "orders": result._id } }).exec().then(result => {
                                    Customer.findByIdAndUpdate(req.body.customer, { $push: { order: result._id } }).exec().then(result => {
                                        console.log(result);
                                        res.status(201).json({ res: result });
                                    }).catch(error => console.log(error));
                                    
                                }).catch(error => console.log(error));

                            }).catch(error => console.log(error));

                    }).catch(error => console.log(error));

                }).catch(error => console.log(error));

            }).catch(error => console.log(error));
        }
    });
};

exports.getOrders = (req, res, next) => {
    console.log(req.body);
    return res.status(201).json({
        res: req.body
    });

};