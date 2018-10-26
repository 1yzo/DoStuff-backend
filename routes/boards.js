const express = require('express');
const router = express.Router();
const Board = require('../models/board');

router.post('/', (req, res) => {
    const { todo, doing, done } = req.body;
    const board = new Board({
        todo,
        doing,
        done
    });

    board.save()
        .then(board => res.json(board))
        .catch(err => res.status(500).send(err));
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { updates } = req.body;

    Board.find({ _id: id }).updateOne(updates)
        .then(() => res.send('Success'))
        .catch(err => res.status(500).send(err));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Board.findOne({ _id: id })
        .then(board => board ? res.json(board) : res.status(400).send('Board does not exist'))
        .catch(err => res.status(500).send(err));
});

module.exports = router;