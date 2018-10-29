const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Each array should consist of objects following this schema { itemId: String, title: String }

const commentSchema = new Schema({
    text: { type: String, require: true },
    date: { type: Number, required: true }
});

const itemSchema = new Schema({
    title: { type: String, required: true },
    index: { type: Number, required: true },
    color: { type: String, require: true },
    details: String,
    comments: [commentSchema],
    id: { type: String, required: true },
    date: { type: Number, required: true }
});

const boardSchema = new Schema({
    todo: [itemSchema],
    doing: [itemSchema],
    done: [itemSchema]
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;