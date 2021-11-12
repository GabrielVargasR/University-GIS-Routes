"use strict";
exports.__esModule = true;
var express = require("express");
var demoController_1 = require("../controllers/demoController");
var app = express();
var demoController = new demoController_1["default"]();
// middleware for development stages only
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    next();
});
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', "*");
    next();
});
app.get("/", function (req, res, next) {
    if (req.query.name) {
        demoController.getDemo(req.query.name.toString())
            .then(function (book) {
            res.status(200).json({
                query: req.query.q,
                book: book
            });
        });
    }
    else {
        demoController.getDemos()
            .then(function (books) {
            res.status(200).json({
                query: req.query.q,
                books: books
            });
        })["catch"](function () {
            res.status(400).json({
                message: "Error: Couldn't fetch articles"
            });
        });
    }
});
exports["default"] = app;
