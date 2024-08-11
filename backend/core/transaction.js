// Transaction class
class Transaction {
    constructor (amount, sender, recipient) {
        this.amount = amount;
        this.sender = sender;
        this.recipient = recipient;
    }

    //Validating a transaction if it has been signed by the owner of a particular private/public key
    ValidateTransaction() {
        //TODO
    }
}


module.exports = Transaction;