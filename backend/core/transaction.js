const Wallet = require('../client/src/wallet')
const hashFunc = require('../util/util')
const elliptic = require('elliptic').ec;
const ec = new elliptic('secp256k1');

// Transaction class
class Transaction {
    constructor (amount, sender, recipient) {
        this.amount = amount;
        this.sender = sender;
        this.recipient = recipient;
        this.signature = null;
    }

    HashTransaction() {
        const transactionDataAsString = `${this.amount}${this.sender}${this.recipient}`
        return hashFunc(transactionDataAsString);
    }

    SignTransaction(signingKey) {
        if (signingKey.getPublic('hex') !== this.sender) {
            throw new Error('You cannot sign transaction for another wallet.');
        }
    
        const hashedTransaction = this.HashTransaction();
        const sig = signingKey.sign(hashedTransaction, 'base64');
        this.signature = sig.toDER('hex');

        return this.signature;
    }

    //Validating a transaction if it has been signed by the owner of a particular private/public key
    IsValidTransaction() {
        const BlockChainAddress = '0000000000000000000000000000000000000000000000000000000BYTECHAIN';
        if (this.sender === BlockChainAddress) return true;

        if (!this.signature || this.signature === 0) {
            throw new Error('This transaction does not contain a signature')
        }
        
        const publicKey = ec.keyFromPublic(this.sender, 'hex');
        return publicKey.verify(this.HashTransaction(), this.signature);
    }
}


module.exports = Transaction;