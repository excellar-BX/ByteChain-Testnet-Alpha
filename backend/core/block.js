const { hashFunc } = require('../util/util');
const buildMerkleTree = require('./merkleTree')
const Transaction = require('./transaction');

const MiningDifficulty = 3;

// Block class
class Block {
    constructor (blockHeight, transactions, trxCount, prevBlockHash) {
        this.nonce = 0;
        this.blockHeight = blockHeight;
        this.timestamp = Date.now();
        this.transactions = transactions;
        this.trxCount = trxCount;
        this.merkleroot = '';
        this.prevBlockHash = prevBlockHash;
        this.blockHash = '';
    }

    //Method to hash a block 
    HashBlock() {
        const blockDataAsString = `${this.blockHeight}${this.nonce}${JSON.stringify(this.transactions)}${this.merkleroot}${this.prevBlockHash}`;
        this.blockHash = hashFunc(blockDataAsString);
        return this.blockHash;
    }

   // Validating if the hash generated by HashBlock() using Proof of Work(PoW);
    ProofOfWork() {
        this.merkleroot = this.CalculateMerkleRoot();
        while (true) {
            this.HashBlock();
            if (this.HashBlock().substring(0, MiningDifficulty) === '0'.repeat(MiningDifficulty)) {
                break;
            }
            this.nonce++;
        };
        return this.nonce;
    } 

    CalculateMerkleRoot() {
        if (this.transactions.length === 0) {
            return '';
        }

        return buildMerkleTree(this.transactions);
    }

    ContainValidTransactions() {
        for (const transaction of this.transactions) {
            if (!(transaction instanceof Transaction)) {
                throw new Error('Invalid transaction instance');
            }
            if (!transaction.IsValidTransaction()) {
                return false;
            }
        }
        return true;
    }
}


module.exports = Block;