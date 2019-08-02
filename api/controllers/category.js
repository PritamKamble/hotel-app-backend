const mongoose = require("mongoose");
const Menu = require("../models/menu");
const Category = require("../models/category");
const Hotel = require("../models/hotel");

exports.saveCategory = (req, res, next) => {
    const id = req.params.id;
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        categoryName: req.body.categoryName,
    });
    category.save()
        .then(result => {
            Hotel.findByIdAndUpdate(id, { $push: { categoryName: (result._id) } }).exec();
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({
                msg: "Error while Saving Category details",
                err: err
            });
        });
};

exports.getCategory = (req, res, next) => {
    console.log(req.params.id);

    Hotel.findById(req.params.id)
        .populate(
            {
                path: "categoryName",
                populate: {
                    path: "menuName"
                }
            })
        .then(result => {
            res.status(201).json(result.categoryName);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });

};

exports.removeCategory = (req, res, next) => {

    const id = req.params.id;

    Category.findById(id)
        .populate('menuName')
        .exec()
        .then(res => {
            for (let i = 0; i < res.menuName.length; i++) {
                Menu.findByIdAndRemove(res.menuName[i]).exec();
            }
        })
        .catch(err => console.log(err));

    Category.deleteOne({ _id: id })
        .exec()
        .then(result => {
            Hotel.updateOne({ $pull: { categoryName: new mongoose.Types.ObjectId(id) } }).exec();
            res.status(200).json({
                message: "Category details removed",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                err: err
            });
        });
};

exports.updateCategory = (req, res, next) => {
    const id = req.params.id;
    console.log(req.body.categoryName, id);

    Category.findByIdAndUpdate(id, { categoryName: req.body.categoryName })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Category Updated",
                result: result
            });
        })
        .catch(err => {
            console.log(err);

            res.status(500).json({
                err: err
            });
        });
};