const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: { type: String, required: true },
    details: String,
    comments: Array
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;