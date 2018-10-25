const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Each array should consist of objects following this schema { itemId: String, title: String }

const itemInfoSchema = new Schema({
    item: { type: ObjectId, required: true },
    title: { type: String, required: true },
    commentCount: { type: Number, required: true }
});

const boardSchema = new Schema({
    todo: [itemInfoSchema],
    doing: [itemInfoSchema],
    done: [itemInfoSchema]
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;