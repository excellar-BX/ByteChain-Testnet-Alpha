const Block = require('./block');
const Transaction = require('./transaction');

//The blockchain_address of the blockchain and the mining reward for miner
const BlockChainAddress = '0000000000000000000000000000000000000000000000000000000BYTECHAIN';
const MiningReward = 2000;

//BlockChain class
class BlockChain {
    constructor (minerBlockChainAddress) {
        this.chain = [];
        this.transactionPool = [];
        this.minerBlockChainAddress = minerBlockChainAddress
        this.GenesisBlock();
    }

    //Creating genesis block
    GenesisBlock() {
        const transactions = [new Transaction(10, 'ryuiwehiuawyudhwehduiwdfiweguiodhuiwu', 'gdwudyuiwhhff3y478y78weyuify4783y783')];
        const prevBlockHash = 'BYTECHAINGENESISBLOCK';
        const genesisBlock = new Block((this.chain.length + 1), transactions, prevBlockHash);
        genesisBlock.ProofOfWork();
        this.chain.push(genesisBlock);
    }

    //Getting the last block in the chain
    GetLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    //Creating and Adding a new transaction to the transaction pool
    AddNewTransaction(amount, sender, recipient) {
        const transaction = new Transaction(amount, sender, recipient);
        this.transactionPool.push(transaction);
        return transaction;
    }

    //Creating a new block
    AddNewBlock() {
        const blockHeight = this.chain.length + 1;
        const transactions = this.transactionPool;
        const prevBlockHash = this.GetLastBlock().blockHash;
        const newBlock = new Block(blockHeight, transactions, prevBlockHash);
        newBlock.ProofOfWork();
        this.transactionPool = []
        this.chain.push(newBlock);
        return newBlock;
    }

    //Calling AddNewBlock() so that we can add a new block to the chain
    Mine() {
        this.AddNewTransaction(MiningReward, BlockChainAddress, this.minerBlockChainAddress);
        this.AddNewBlock();
        return true;
    }

    //Calculating a user's balance and returning it;
    CalculateBalance(blockChainAddress) {
        let balance = 0.00000000;
        const chain = this.chain;
        chain.forEach(block => {
            const transactions =  block.transactions;
            transactions.forEach(transaction => {
                const amount = transaction.amount;
                const sender = transaction.sender;
                const recipient = transaction.recipient;
                if(blockChainAddress === sender) {
                    balance -= amount;
                } else if (blockChainAddress === recipient) {
                    balance += amount;
                }                
            });
        });
        return balance + '.000';
    }
}


// let myAddress = 'hduihwuiodfhuuio2u3iou39unp34iu03iouimi9u389u8ouf';
// const blockchain = new BlockChain(myAddress);
// blockchain.Mine();

// console.log(blockchain);

module.exports = BlockChain;
