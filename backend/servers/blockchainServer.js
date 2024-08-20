const Node = require('../core/node');

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const node = new Node();

// const miningTimer = 10000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/blockchain', (req, res) => {
    res.status(200).send(node.blockchain.chain);
});

app.get('/transactions', (req, res) => {
    res.status(200).send(node.blockchain.transactionPool);
});

app.post('/add-new-transaction', (req, res) => {
    const { transaction, publicKey } = req.body;

    if (!transaction || !publicKey) {
        return res.status(400).json({ message: 'Incomplete request data' });
    }

    const parsedTransaction = JSON.parse(transaction);
    const parsedPublicKey = JSON.parse(publicKey)
    
    if (!parsedTransaction.amount || !parsedTransaction.sender || !parsedTransaction.recipient) {
        return res.status(400).json({ message: 'Incomplete transaction data' });
    }

    try {
        node.AddNewTransaction(parsedTransaction, parsedPublicKey);
        res.status(201).json({ message: 'Transaction added successfully' });
    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).json({ message: 'Failed to add transaction', error: error.message });
    }
});


app.post('/smart-contract', (req, res) => {
    const { code } = req.body;
    
    if (!code) {
        return res.status(400).json({ message: 'Smart contract code is required' });
    }

    try {
        const result = node.ExecuteSmartContract(code);
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error executing smart contract:', error);
        res.status(500).json({ message: 'Failed to execute smart contract', error: error.message });
    }
});

app.get('/mine', (req, res) => {
    try {
        node.Mine();
        res.status(200).json({ message: 'Block mined successfully' });
    } catch (error) {
        console.error('Error mining block:', error);
        res.status(500).json({ message: 'Failed to mine block', error: error.message });
    }
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});


