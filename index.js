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
    setInterval(function () {
        ws.send(JSON.stringify({time: `${moment().format('h:mm:ss')}:${moment().milliseconds()}`}))
    }, 100);
});

server.listen(8080, function listening() {
    console.log('Listening on %d', server.address().port);
});