"use strict";
exports.__esModule = true;
var express = require("express");
var logger_1 = require("../common/logger");
var demo_1 = require("./demo");
var Routes = /** @class */ (function () {
    function Routes() {
        this.express = express();
        this.logger = new logger_1["default"]();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    Routes.prototype.middleware = function () {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
    };
    Routes.prototype.routes = function () {
        this.express.use("/demo", demo_1["default"]);
        this.express.use('/test', function (req, res, next) {
            res.send("<h2>Everything looks great</h2>");
        });
    };
    return Routes;
}());
exports["default"] = new Routes().express;
