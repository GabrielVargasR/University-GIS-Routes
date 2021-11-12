"use strict";
exports.__esModule = true;
exports.Demo = void 0;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var demoSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number,
    birthday: Date
});
// looks for 'demos' collection in mongodb
// lower case and plurals Demo to demos
exports.Demo = mongoose.model('Demo', demoSchema);
