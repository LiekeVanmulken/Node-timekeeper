const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const moment = require('moment');

const app = express();

app.use(function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
    let i = setInterval(function () {
        try {
            ws.send(JSON.stringify({time: `${moment().format('HH:mm:ss:SS')}`}));
        } catch (error) {
            clearInterval(i);
        }
    }, 66);
});

server.listen(8080, function listening() {
    console.log('Listening on %d', server.address().port);
});