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
        res.status(400).json({
            message: 'Please provide all required fields'
        });
    }

    node.AddNewTransaction(transaction, publicKey)
});

app.post('/smart-contract', (req, res) => {
    const { code } = req.body;
    res.status(200).json({
        result: node.ExecuteSmartContract(code)
    })
    // TODO: Implement smart contract execution
})

app.get('/mine', (req, res) => {
    node.Mine()
    res.status(200).json({ message: 'Block mined successfully' })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});