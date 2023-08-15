const WebSocketServer = require('websocket').server;

class WebsocketService {
    
    constructor() {
        this.activeConnections = [];
    }

    start = (httpServer) => {
        this.wsServer = new WebSocketServer({ 
            httpServer : httpServer,
            autoAcceptConnections: true
        });

        this._setupListeners();
    }

    sendMessage = (message) => {
        this.activeConnections.forEach(con => con.send(JSON.stringify(message)));
    }

    _setupListeners = () => {
        this.wsServer.on('connect', (connection) => {
            this.activeConnections.push(connection);
            console.log(`[Websocket service] Client connected (current active connections: ${this.activeConnections.length})`);
        })

        this.wsServer.on('close', () => {
            this.activeConnections = this.activeConnections.filter(con => con.connected);
            console.log(`[Websocket service]  Client disconnected (current active connections: ${this.activeConnections.length})`);
        })
    }
}

module.exports = WebsocketService;