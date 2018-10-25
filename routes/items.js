const express = require('express');
const router = express.Router();
const Item = require('../models/item');

router.post('/', (req, res) => {
    const { title, details, index, color } = req.body; 
    const item = new Item({
        title,
        details,
        index,
        color
    });
    item.save()
        .then(item => res.json(item))
        .catch(err => res.status(500).send(err));
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    Item.find({ _id: id }).updateOne(updates)
        .then(() => res.send('Success'))
        .catch(err => res.status(500).send(err));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Item.findOne({ _id: id })
        .then(item => res.json(item))
        .catch(err => res.status(500).send(err));
});

module.exports = router;