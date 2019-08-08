const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

/////////////---------Routes------///////////////////

const menuRoute = require("./api/hotel/routes/menu");
const categoryRoute = require("./api/hotel/routes/category");
const hotelRoute = require("./api/hotel/routes/hotel");
const userRoute = require("./api/hotel/routes/user");
const customerRoute = require("./api/customer/routes/customer");
const orderRoute = require("./api/order/routes/order");

//////////////////////////////////////////////////////


mongoose.connect('mongodb+srv://node-shop:node-shop@node-shop-rest-slxeu.mongodb.net/hotel?retryWrites=true&w=majority',
    { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests

app.use("/menu", menuRoute);

app.use("/category", categoryRoute);

app.use("/hotel", hotelRoute);

app.use("/user", userRoute);

app.use("/customer", customerRoute);

app.use("/order", orderRoute);

/////////////////////////////////////////////

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;