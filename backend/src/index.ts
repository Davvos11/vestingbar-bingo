import express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({server, path: "/ws"});

function broadcast(message: string) {
    console.log(message);
    webSocketServer.clients.forEach(function each(client) {
        client.send(message);
    });
}

webSocketServer.on('connection',
    (webSocket: WebSocket) => {
        webSocket.on('message', (message: string) => {
            broadcast(message.toString());
        });
        console.log('Client connected')
    });
server.listen(process.env.PORT || 8080, () => {
    console.log('Server started');
});
