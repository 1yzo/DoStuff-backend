const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const htmlparser = require('htmlparser');
const fetch = require('node-fetch');
const app = new express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const boards = require('./routes/boards');

app.use(cors());
app.use(bodyParser.json());

require('./mongo').connect();
app.use('/boards', boards);

// Return Open Graph info to create link previews
app.post('/api/link_preview', (req, res) => {
    fetch(req.query.link)
        .then(response => response.text())
        .then(body => {
            const handler = new htmlparser.DefaultHandler((error, dom) => {
                if (error) {
                    res.status(500).send(error);
                }
                const head = dom.find(element => element.name === 'html').children.find(element => element.name === 'head');
                const metaTags = head.children
                    .filter(element => element.name === 'meta')
                    .filter(element => element.attribs.property && element.attribs.property.includes('og'));
                const linkPreview = metaTags.reduce((acc, curr) => ({
                    ...acc,
                    [curr.attribs.property]: curr.attribs.content
                }), {});

                res.json(linkPreview);
            }, { verbose: false });
            const parser = new htmlparser.Parser(handler);
            parser.parseComplete(body);
        })
        .catch(() => undefined);
});

io.on('connection', (socket) => {
    socket.on('new user', (boardId) => {
        socket.join(boardId);
    });

    socket.on('update', (justDroppedId) => {
        const boardId = Object.keys(socket.rooms)[1];
        io.to(boardId).emit('update', { senderId: socket.id, justDroppedId });
    });
});

const PORT = 3000;
http.listen(PORT, () => {
    console.log('Server running on port', PORT);
});