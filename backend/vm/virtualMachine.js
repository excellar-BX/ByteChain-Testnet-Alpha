class VirtualMachine {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.state = {}; // Stores contract states
    }

    ExecuteContract(code) {
        if (!code.data) {
            console.log('No valid contract code found.');
            return false;
        }

        try {
            const context = {
                state: this.state, 
                blockchain: this.blockchain,
                fromAddress: transaction.fromAddress,
                
                send: this.Send.bind(this)
            };

            const func = new Function(context, transaction.data.code);
            func(context);

            return true;
        } catch (error) {
            console.error('Error executing contract:', error);
            return false;
        }
    }
}

