const mongoose = require("mongoose");
const Menu = require("../models/menu");
const Category = require("../models/category");
const Hotel = require("../models/hotel");
const User = require("../models/user");


exports.saveHotel = (req, res, next) => {
    const id = req.params.id;
    const hotel = new Hotel({
        _id: new mongoose.Types.ObjectId(),
        hotelName: req.body.hotelName,
    });
    hotel.save()
        .then(result => {
            res.status(201).json(result);
            User.findByIdAndUpdate(id, { $push: { hotelName: (result._id) } }).exec();
        })
        .catch(err => {
            res.status(500).json({
                msg: "Error while Saving hotel details",
                err: err
            });
        });
};

exports.getHotel = (req, res, next) => {

    User.findById(req.params.id)
        .populate("hotelName")
        .then(result => {
            return res.status(200).json(result.hotelName);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.getAllHotel = (req, res, next) => {

    Hotel.find()
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.removeHotel = (req, res, next) => {

    const id = req.params.id;

    Hotel.findById(id)
        .populate('categoryName')
        .exec()
        .then(res => {
            for (let i = 0; i < res.categoryName.length; i++) {
                Category.findById(res.categoryName[i])
                    .populate('menuName')
                    .exec()
                    .then(res => {
                        for (let i = 0; i < res.menuName.length; i++) {
                            Menu.findByIdAndRemove(res.menuName[i]).exec();
                        }
                    })
                    .catch(err => console.log(err));

                Category.findByIdAndRemove(res.categoryName[i]).exec();
            }
        })
        .catch(err => console.log(err));

    Hotel.deleteOne({ _id: id })
        .exec()
        .then(result => {
            User.updateOne({ $pull: { hotelName: new mongoose.Types.ObjectId(id) } }).exec();
            console.log(result);
            res.status(200).json({
                message: "Hotel details removed",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                err: err
            });
        });
};
