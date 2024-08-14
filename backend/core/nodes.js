const BlockChain = require('./blockchain');
const WebSocket = require('ws');

const bytechain = new BlockChain()

//.Creating a node class
class Node {
    constructor(id, port) {
        this.id = id;
        this.port = port;
        this.balance = 0;
        this.peers = [];
    } 

    //Starting the WebSocket server
    StartServer() {
        const server = new WebSocket.Server({ port: this.port });
        server.on('connection', ws => {
            this.AddPeer(ws);
            console.log(`Node ${this.id} is running on port ${this.port}`);
        });

        
    }

    //Method for connecting a node to a peer
    ConnectToPeer(peerAddress) {
        const ws = new WebSocket(peerAddress);
        ws.on('open', () => this.AddPeer(ws));
    }

    //Method for adding a node to a peer
    AddPeer() {
        this.peers.push(ws);
        console.log(`Node ${this.id} is connected to a peer`);
        ws.on('message', message => this.HandleMessage(message));
    }

    //Method for handling broadcasted messages about a new blocks from other nodes
    HandleMessage(message) {
        const parsedMessage = JSON.parse(message);
        if(parsedMessage.type === 'block') {
            this.HandleIncomingBlock(parsedMessage.b)
        }
    }

    //Method for handling broadcasted blocks from other nodes
    HandleIncomingBlock(message) {
        const parsedMessage = JSON.parse(message);
        if(parsedMessage.type === 'block') {
            this.HandleIncomingBlock(parsedMessage.b)
        }
    }

    //Method for broadcasted blocks to other nodes
    SendMessage(message) {
        const parsedMessage = JSON.parse(message);
        if(parsedMessage.type === 'block') {
            this.handleIncomingBlock(parsedMessage.b)
        }
    }

    //Method for broadcasting blocks to other nodes
    HandleOutgoingBlock(message) {
        const parsedMessage = JSON.parse(message);
        if(parsedMessage.type === 'block') {
            this.HandleIncomingBlock(parsedMessage.b)
        }
    }
}

module.exports = Node;