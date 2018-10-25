const express = require('express');
const cors = require('cors');
const app = new express();

const boards = require('./routes/boards');
const items = require('./routes/items');

app.use(cors());

require('./mongo').connect();
app.use('/boards', boards);
app.use('/items', items);

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});