const express = require('express');
const cors = require('cors');
const app = new express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Worked!!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});