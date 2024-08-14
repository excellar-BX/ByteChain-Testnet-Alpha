const BlockChain = require('../core/blockchain');
const Transaction = require('../core/transaction');
const Wallet = require('./src/wallet');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;



const bytechain = new BlockChain();
const wallet = new Wallet();

app.use(express.json());

app.get('/create-new-wallet', (req, res) => {
    const privateKey = wallet.privateKey;
    const publicKey = wallet.publicKey;
    const blockchainAddress = wallet.blockchainAddress;

    res.status(201).json({
        privateKey, 
        publicKey, 
        blockchainAddress, 
        message: 'Do not share your private key with anyone, but to receive any transaction share your blockchain address' 
    });
});

app.post('/check-balance', (req, res) => {
    const { publicKey } = req.body;

    if (!publicKey) {
        return res.status(400).json({
            message: 'Public key is required.'
        });
    }

    if (publicKey !== wallet.CreateBlockChainAddress()) {
        res.status(400).json({ message: 'Please provide a valid public key' })
    }

    const balance = bytechain.CalculateBalance(publicKey)
    res.status(200).json({ message: `Your balance is ${balance}`})
});

app.post('/create-transaction', (req, res) => {
    const { amount, sender, recipient, privateKey } = req.body;

    if (!amount || !sender || !recipient || !privateKey) {
        res.status(400).json({
            message: 'Please provide all required fields'
        })
    }

    try {
        const transaction = new Transaction(amount, sender, recipient);
        transaction.SignTransaction(privateKey);
        bytechain.AddNewTransaction(transaction);

        res.status(201).json({ message: 'Transaction completed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Transaction failed', error: error.message });
    }
});

app.post('/create-new-contract', (req, res) => {
    //creating new contract logic
    //<TODO></TODO>
    res.status(201).json({ message: 'Contract added to blockchain successfully' })
});


app.listen(port, () => {
    console.log('Server running on port 3001');
});
