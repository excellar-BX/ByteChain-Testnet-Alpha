class VirtualMachine {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.state = {}; // Stores contract states
    }

    executeContract(transaction) {
        if (!transaction.data || typeof transaction.data.code !== 'string') {
            console.log('No valid contract code found.');
            return false;
        }

        try {
            const context = {
                state: this.state,
                blockchain: this.blockchain,
                fromAddress: transaction.fromAddress,
                toAddress: transaction.toAddress,
                amount: transaction.amount,
                send: this.send.bind(this)
            };

            const func = new Function('context', transaction.data.code);
            func(context);

            return true;
        } catch (error) {
            console.error('Error executing contract:', error);
            return false;
        }
    }

    send(fromAddress, toAddress, amount) {
        const transaction = new Transaction(fromAddress, toAddress, amount);
        transaction.signTransaction(ec.keyFromPrivate(fromAddress));

        if (transaction.isValid()) {
            this.blockchain.addTransaction(transaction);
            console.log(`Transaction from ${fromAddress} to ${toAddress} for amount ${amount} executed.`);
        } else {
            console.log('Transaction failed to execute due to invalid signature.');
        }
    }
}
