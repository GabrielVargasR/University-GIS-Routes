"use strict";
exports.__esModule = true;
var logger_1 = require("../common/logger");
var mongoController_1 = require("../database/mongoController");
var BookController = /** @class */ (function () {
    function BookController() {
        var _this = this;
        this.getBook = function (name) {
            return Promise.resolve(_this.db.getDemo(name))
                .then(function (books) {
                return new Promise(function (resolve, reject) {
                    resolve(books);
                });
            })["catch"](function (error) {
                return new Promise(function (resolve, reject) {
                    reject(error);
                });
            });
        };
        this.logger = new logger_1["default"]();
        this.db = new mongoController_1["default"]();
    }
    BookController.prototype.getBooks = function () {
        return Promise.resolve(this.db.getDemos())
            .then(function (books) {
            return new Promise(function (resolve, reject) {
                resolve(books);
            });
        })["catch"](function (error) {
            return new Promise(function (resolve, reject) {
                reject(error);
            });
        });
    };
    return BookController;
}());
exports["default"] = BookController;
