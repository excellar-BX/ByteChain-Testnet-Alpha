const bootstrapNodes = ['http://localhost:3500', 'http://localhost:3501'];

const Blockchain = require('./blockchain');
const Wallet = require('../client/wallet')
const Transaction = require('./transaction')

const axios = require('axios');

const bytechain = new Blockchain()
const wallet = new Wallet();

const MiningReward = 1024;

class Node {
    constructor() {
        this.blockchain = bytechain;        ;
        this.port = 3000; 
        this.peers = []; 
        this.isMiner = false;
        this.minerAddress = wallet.blockchainAddress
    }

    ConnectToBootstrapNodes() {
        bootstrapNodes.forEach(nodeUrl => {
            axios.get(`${nodeUrl}/peers`).then(response => {
                this.peers.push(...response.data.peers);
            }).catch(error => {
                console.error(`Error connecting to bootstrap node ${nodeUrl}:`, error.message);
            });
        });
    }

    AddNewTransaction(transaction, pubKey) {
        if (!transaction.signature) return false;
        
        this.blockchain.AddNewTransaction(transaction, pubKey);
        this.BroadCastTransaction(transaction);
    }

    ExecuteSmartContract(code) {
        // const context = {
        //     wallet: wallet,
        //     transaction: transaction,
        //     executeSmartContract: this.ExecuteSmartContract.bind(this)
        // };
    }

    Mine() {
        const MiningRewardTransaction = new Transaction(MiningReward, this.blockchain.blockChainAddress, this.minerAddress);
        this.blockchain.AddNewTransaction(MiningRewardTransaction)
        this.blockchain.AddNewBlock(); //const newBlock = 

    }

    async StartMining() {
        while (true) {
            if (this.isMiner) {
                const MiningRewardTransaction = new Transaction(MiningReward, this.blockchain.blockChainAddress, this.minerAddress);
                this.blockchain.AddNewTransaction(MiningRewardTransaction)
                const newBlock = this.blockchain.AddNewBlock(); 
                this.BroadCastBlock(newBlock);
                await this.SyncWithPeers();
            } else {
                this.SelectMiner();
            }
            await this.WaitForNextBlock();
        }
    }

    async WaitForNextBlock() {
        await new Promise(resolve => setTimeout(resolve, this.blockchain.blockTime));
    }

    BroadCastTransaction(transaction) {
        this.peers.forEach(peerUrl => {
            axios.post(`${peerUrl}/transactions`, transaction).catch(error => {
                console.error(`Error broadcasting transaction to ${peerUrl}:`, error.message);
            });
        });
    }

    BroadCastSmartContract() {
        this.peers.forEach(peerUrl => {
            axios.post(`${peerUrl}/smartContract`, { code }).catch(error => {
                console.error(`Error broadcasting smart contract to ${peerUrl}:`, error.message);
            });
        }); 
    }

    BroadCastBlock(block) {
        this.peers.forEach(peerUrl => {
            axios.post(`${peerUrl}/blocks`, block).catch(error => {
                console.error(`Error broadcasting block to ${peerUrl}:`, error.message);
            });
        });
    }

    async SyncWithPeers() {
        this.peers.forEach(async peerUrl => {
            try {
                const response = await axios.get(`${peerUrl}/blocks`);
                const otherBlocks = response.data;
                this.blockchain.syncBlocks(otherBlocks);
            } catch (error) {
                console.error(`Error syncing with peer ${peerUrl}:`, error.message);
            }
        });
    }

    SelectMiner() {
        const minerPool = [...this.peers, `http://localhost:${this.port}`];

        const selectedMinerUrl = minerPool[Math.floor(Math.random() * minerPool.length)];

        if (selectedMinerUrl === `http://localhost:${this.port}`) {
            this.isMiner = true; 
        } else {
            this.isMiner = false; 
        }

        // Announce the selected miner to the network
        this.AnnounceMiner(selectedMinerUrl);
    }

    AnnounceMiner(minerUrl) {
        this.peers.forEach(peerUrl => {
            axios.post(`${peerUrl}/announce-miner`, { minerUrl }).catch(error => {
                console.error(`Error announcing miner to ${peerUrl}:`, error.message);
            });
        });
    }

    AddPeer(peerUrl) {
        if (!this.peers.includes(peerUrl)) {
            this.peers.push(peerUrl);
        }
    }

    AnnounceToNetwork() {
        this.peers.forEach(peerUrl => {
            axios.post(`${peerUrl}/announce`, { peerUrl: `http://localhost:${this.port}` }).catch(error => {
                console.error(`Error announcing to ${peerUrl}:`, error.message);
            });
        });
    }
}

// const node = new Node() 

// /* console.log(`This is your wallet info: Do not share your private key with anybody, but to receive bytes from another user send your Wallet Address \nPrivateKey: ${wallet.privateKey} \nPublicKey: ${wallet.publicKey} \nWalletAddress: ${wallet.blockchainAddress}`) */

// const num = Buffer.from([0X17]);
// console.log(num.toString('utf8'))

module.exports = Node;