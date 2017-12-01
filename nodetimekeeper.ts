declare type Set = {};
import * as express from "express";
import * as http from "http";
import * as url from "url";
import * as ws from "ws";
import * as moment from "moment";

const app = express();

app.use(function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

const server = http.createServer(app);
const wss = new ws.Server({server});

setInterval(() => {
    const time = JSON.stringify({time: `${moment().format('HH:mm:ss:SS')}`});
    (wss.clients as WebSocket[])
        .forEach((socket: WebSocket) => {
            socket.send(time);
        });
}, 66);

server.listen(8080, function listening() {
    console.log('Listening on %d', server.address().port);
});