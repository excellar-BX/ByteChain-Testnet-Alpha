//Importing the block and transaction class
const Block = require('./block');
const Transaction = require('./transaction');

//The blockchain_address of the blockchain and the mining reward for miner
const BlockChainAddress = '0'.repeat(25) + 'BYTECHAIN';
const MiningReward = 2000;

const GenesisTransactionAmount = 1000000;
const GenesisTransactionRecipient = '1J8uVRSxixFcRFUjKPJNRkNhTev5dpsHXi'; 
const GenesisBlockPrevHash = '0'.repeat(64)

const minerBlockChainAddress = '13uqkcZgHKztNwptfxEBvGdf25684eszCB'

//BlockChain class
class BlockChain {
    constructor () {
        this.chain = [];
        this.transactionPool = [];
        this.minerBlockChainAddress = minerBlockChainAddress
        this.GenesisBlock();
    }

    //Creating genesis block
    GenesisBlock() {
        const genesisTransaction = new Transaction(
            GenesisTransactionAmount,
            BlockChainAddress,
            GenesisTransactionRecipient
        );
        const genesisBlock = new Block(1, [genesisTransaction], GenesisBlockPrevHash);
        genesisBlock.ProofOfWork();
        this.chain.push(genesisBlock);
    }

    //Getting the last block in the chain
    GetLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    //Creating and Adding a new transaction to the transaction pool
    AddNewTransaction(transaction, pubKey) {
        if (!(transaction instanceof Transaction)) {
            throw new TypeError('Invalid transaction');
        }

        if (!transaction.IsValidTransaction(pubKey)) {
            throw new Error('Invalid transaction');
        }

        this.transactionPool.push(transaction);
        return transaction;
    }

    //Creating a new block
    AddNewBlock() {
        const blockHeight = this.chain.length + 1;
        const transactions = this.transactionPool;
        const trxCount = transactions.length;
        const prevBlockHash = this.GetLastBlock().blockHash;
        const newBlock = new Block(blockHeight, transactions, trxCount, prevBlockHash);
        newBlock.ProofOfWork();

        this.transactionPool = []
        this.chain.push(newBlock);

        return newBlock; 
    }

    //Calling AddNewBlock() so that we can add a new block to the chain
    Mine() {
        const MiningRewardTransaction = new Transaction(MiningReward, BlockChainAddress, this.minerBlockChainAddress);
        this.AddNewTransaction(MiningRewardTransaction)
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
                if (blockChainAddress === sender) {
                    balance -= amount;
                } else if (blockChainAddress === recipient) {
                    balance += amount;
                }                
            });
        });
        return balance.toFixed(8);
    }

    //                                        TODO
    // AllTransactionsMade(blockChainAddress) {
    //     const trxs = []
    //     const chain = this.chain;
    //     chain.forEach(block => {
    //         const transactions =  block.transactions;
    //         transactions.forEach(transaction => {
    //             const sender = transaction.sender;
    //             const recipient = transaction.recipient;
    //             if (blockChainAddress === sender || blockChainAddress === recipient) {
    //                 trxs.push(transaction)
    //             } else {
    //                 return false;
    //             }                
    //         }); 
    //     });
    //     return trxs;
    // }

    IsChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i -1];

            if (!(currentBlock instanceof Block) || !(prevBlock instanceof Block)) {
                return false;
            }
            if (!currentBlock.ContainValidTransactions()) {
                return false
            }

            if (currentBlock.blockHash !== currentBlock.HashBlock()) {
                return false
            }

            if (currentBlock.prevBlockHash !== prevBlock.blockHash) {
                return false
            }
        }
        return true;
    }
}


module.exports = BlockChain;
