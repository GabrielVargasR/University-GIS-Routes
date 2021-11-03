
import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const demoSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number,
    birthday: Date,
});

// looks for 'demos' collection in mongodb
// lower case and plurals Demo to demos
export const Demo = mongoose.model('Demo', demoSchema);