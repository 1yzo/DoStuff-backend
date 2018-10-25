const express = require('express');
const router = express.Router();
const Item = require('../models/item');

router.post('/', (req, res) => {
    const item = new Item({
        title: 'Just testing things out',
        details: 'Some test details',
        comments: ['When does this have to be done by???']
    });
    item.save().then(item => res.json(item));
});

module.exports = router;