const mongoose = require("mongoose");
const User = require("../models/user");

exports.getUser = (req, res, next) => {
    User.find({
        email: req.body.email,
        pass: req.body.pass
    }).populate("hotelName")
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

exports.saveUser = (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        pass: req.body.pass,
    });
    user.save()
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

exports.removeUser = (req, res, next) => {

    const id = req.params.id;

    User.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User details removed",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                err: err
            });
        });
};