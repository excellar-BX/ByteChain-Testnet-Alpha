
// Transaction class
class Transaction {
    constructor (amount, sender, recipient) {
        this.amount = amount;
        this.sender = sender;
        this.recipient = recipient;
    }

    HashTransaction() {
        const transactionDataAsString = `${this.amount}${this.sender}${this.recipient}`
        return hashFunc(transactionDataAsString);
    }

    SignTransaction(signingKey) {
        if(signingKey.getPublic('hex') !== this.sender) {
            throw new Error('You cannot sign transaction for another wallet.');
        }
    
        const hashedTransaction = this.HashTransaction();
        const sig = signingKey.sign(hashedTransaction, 'base64');
        this.signature = sig.toDER('hex');
    }

    //Validating a transaction if it has been signed by the owner of a particular private/public key
    IsValidTransaction() {
        SignTransaction.signature
    }
}


module.exports = Transaction;