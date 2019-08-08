const mongoose = require("mongoose");
const Menu = require("../models/menu");
const Category = require("../models/category");

exports.saveMenu = (req, res, next) => {
    console.log("savung Menu");
    const id = req.params.id;
    const menu = new Menu({
        _id: new mongoose.Types.ObjectId(),
        menuName: req.body.menuName,
        menuPrice: req.body.menuPrice
    });
    menu.save()
        .then(result => {
            Category.findByIdAndUpdate(id, { $push: { menuName: (result._id) } }).exec();
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({
                msg: "Error while Saving menu",
                err: err
            });
        });
};

exports.getMenu = (req, res, next) => {
    const id = req.params.id;
    Category.findById(req.params.id)
        .populate('menuName')
        .then(result => {
            return res.status(200).json(result.menuName);
        });
};

exports.removeMenu = (req, res, next) => {

    const id = req.params.id;

    Menu.deleteOne({ _id: id })
        .exec()
        .then(result => {
            Category.update({ $pull: { menuName: new mongoose.Types.ObjectId(id) } }).exec();
            res.status(200).json({
                message: "Menu deleted",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                err: err
            });
        });
};

exports.updateMenu = (req, res, next) => {
    const id = req.params.id;
    console.log(req.body.menuName, id);
    
    Menu.findByIdAndUpdate(id, { menuName: req.body.menuName, menuPrice: req.body.menuPrice })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Menu Updated",
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