"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var ws = require("ws");
var moment = require("moment");
var app = express();
app.use(function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
var server = http.createServer(app);
var wss = new ws.Server({ server: server });
setInterval(function () {
    var time = JSON.stringify({ time: "" + moment().format('HH:mm:ss:SS') });
    wss.clients
        .forEach(function (socket) {
        socket.send(time);
    });
}, 66);
server.listen(8080, function listening() {
    console.log('Listening on %d', server.address().port);
});
