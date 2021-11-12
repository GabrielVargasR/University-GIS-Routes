"use strict";
exports.__esModule = true;
var demo_1 = require("../schemas/demo");
var MongoController = /** @class */ (function () {
    function MongoController() {
        this.getDemos = function () { return demo_1.Demo.find(); };
        this.getDemo = function (name) { return demo_1.Demo.find({ 'name': name }); };
    }
    return MongoController;
}());
exports["default"] = MongoController;
