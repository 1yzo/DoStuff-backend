const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: { type: String, required: true },
    index: { type: Number, required: true },
    color: { type: String, require: true },
    details: String,
    comments: Array
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;